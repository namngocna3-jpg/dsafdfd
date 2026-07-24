// xlsxlib.mjs — Tạo file .xlsx bằng Node thuần (không cần Python/zip CLI/thư viện ngoài).
// Hỗ trợ: inline string, số, wrap text, merge cells, độ rộng cột, freeze pane,
// và bộ style đặt sẵn: title / section / colheader / label / normal / good / warn / muted.
import fs from 'fs';
import zlib from 'zlib';

// ---------- ZIP (deflate) ----------
const CRC = (() => { const t = new Uint32Array(256);
  for (let n = 0; n < 256; n++) { let c = n; for (let k = 0; k < 8; k++) c = c & 1 ? 0xEDB88320 ^ (c >>> 1) : c >>> 1; t[n] = c >>> 0; }
  return t; })();
function crc32(buf){ let c = 0xFFFFFFFF; for (let i=0;i<buf.length;i++) c = CRC[(c ^ buf[i]) & 0xFF] ^ (c >>> 8); return (c ^ 0xFFFFFFFF) >>> 0; }

function zip(files){ // files: [{name, data:Buffer}]
  const chunks = [], central = []; let offset = 0;
  for (const f of files){
    const nameBuf = Buffer.from(f.name, 'utf8');
    const comp = zlib.deflateRawSync(f.data, { level: 9 });
    const crc = crc32(f.data);
    const local = Buffer.alloc(30);
    local.writeUInt32LE(0x04034b50, 0); local.writeUInt16LE(20, 4); local.writeUInt16LE(0x0800, 6);
    local.writeUInt16LE(8, 8); local.writeUInt16LE(0, 10); local.writeUInt16LE(0x21, 12);
    local.writeUInt32LE(crc, 14); local.writeUInt32LE(comp.length, 18); local.writeUInt32LE(f.data.length, 22);
    local.writeUInt16LE(nameBuf.length, 26); local.writeUInt16LE(0, 28);
    chunks.push(local, nameBuf, comp);
    const cen = Buffer.alloc(46);
    cen.writeUInt32LE(0x02014b50, 0); cen.writeUInt16LE(20, 4); cen.writeUInt16LE(20, 6); cen.writeUInt16LE(0x0800, 8);
    cen.writeUInt16LE(8, 10); cen.writeUInt16LE(0, 12); cen.writeUInt16LE(0x21, 14);
    cen.writeUInt32LE(crc, 16); cen.writeUInt32LE(comp.length, 20); cen.writeUInt32LE(f.data.length, 24);
    cen.writeUInt16LE(nameBuf.length, 28); cen.writeUInt32LE(offset, 42);
    central.push(cen, nameBuf);
    offset += local.length + nameBuf.length + comp.length;
  }
  const cenBuf = Buffer.concat(central); const cenOffset = offset;
  const end = Buffer.alloc(22);
  end.writeUInt32LE(0x06054b50, 0); end.writeUInt16LE(files.length, 8); end.writeUInt16LE(files.length, 10);
  end.writeUInt32LE(cenBuf.length, 12); end.writeUInt32LE(cenOffset, 16);
  return Buffer.concat([...chunks, cenBuf, end]);
}

const esc = s => String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
const colLetter = n => { let s=''; while(n>0){ const m=(n-1)%26; s=String.fromCharCode(65+m)+s; n=Math.floor((n-1)/26); } return s; };

// ---------- styles.xml ----------
// Palette brand Coco: xanh #16A34A-ish, đen #0B1220, xám nhạt.
function stylesXml(){
  const fonts = [
    `<font><sz val="11"/><name val="Calibri"/></font>`,                                        // 0 normal
    `<font><b/><sz val="11"/><name val="Calibri"/></font>`,                                     // 1 bold
    `<font><b/><sz val="18"/><color rgb="FFFFFFFF"/><name val="Calibri"/></font>`,              // 2 title white
    `<font><b/><sz val="12"/><color rgb="FFFFFFFF"/><name val="Calibri"/></font>`,              // 3 section white
    `<font><b/><sz val="11"/><color rgb="FF0B1220"/><name val="Calibri"/></font>`,              // 4 colheader dark
    `<font><sz val="11"/><color rgb="FF6B7280"/><name val="Calibri"/></font>`,                  // 5 muted
    `<font><b/><sz val="11"/><color rgb="FF166534"/><name val="Calibri"/></font>`,              // 6 good green
    `<font><b/><sz val="11"/><color rgb="FF92400E"/><name val="Calibri"/></font>`,              // 7 warn amber
    `<font><b/><sz val="14"/><color rgb="FFFFFFFF"/><name val="Calibri"/></font>`,              // 8 subtitle white
  ];
  const fills = [
    `<fill><patternFill patternType="none"/></fill>`,                       // 0
    `<fill><patternFill patternType="gray125"/></fill>`,                    // 1
    `<fill><patternFill patternType="solid"><fgColor rgb="FF0B1220"/></patternFill></fill>`, // 2 dark (title)
    `<fill><patternFill patternType="solid"><fgColor rgb="FF16A34A"/></patternFill></fill>`, // 3 green (section)
    `<fill><patternFill patternType="solid"><fgColor rgb="FFDCFCE7"/></patternFill></fill>`, // 4 light green (colheader)
    `<fill><patternFill patternType="solid"><fgColor rgb="FFF3F4F6"/></patternFill></fill>`, // 5 light gray (label)
    `<fill><patternFill patternType="solid"><fgColor rgb="FFFEF3C7"/></patternFill></fill>`, // 6 light amber (warn)
    `<fill><patternFill patternType="solid"><fgColor rgb="FFE0F2FE"/></patternFill></fill>`, // 7 light blue (subtitle bg)
  ];
  const borders = [
    `<border><left/><right/><top/><bottom/><diagonal/></border>`,           // 0 none
    `<border><left style="thin"><color rgb="FFD1D5DB"/></left><right style="thin"><color rgb="FFD1D5DB"/></right><top style="thin"><color rgb="FFD1D5DB"/></top><bottom style="thin"><color rgb="FFD1D5DB"/></bottom></border>`, // 1 thin gray
  ];
  // cellXfs: [fontId, fillId, borderId, wrap, valign(top), halign]
  const X = [
    [0,0,0,0,0,''],   // 0 normal (no wrap)
    [0,0,1,1,1,''],   // 1 normal wrap + border + top
    [2,2,0,0,1,'left'],   // 2 TITLE
    [3,3,0,1,1,'left'],   // 3 SECTION
    [4,4,1,1,1,'left'],   // 4 COLHEADER
    [1,5,1,1,1,'left'],   // 5 LABEL (bold, gray bg)
    [0,0,1,1,1,'center'], // 6 normal wrap center
    [6,0,1,1,1,'left'],   // 7 GOOD
    [7,6,1,1,1,'left'],   // 8 WARN (amber bg)
    [5,0,1,1,1,'left'],   // 9 MUTED
    [8,7,0,1,1,'left'],   // 10 SUBTITLE (blue bg)
    [1,4,1,1,1,'left'],   // 11 bold on light green
    [1,0,1,1,1,'left'],   // 12 bold wrap normal bg
  ];
  const xfXml = X.map(([f,fi,b,wrap,top,h])=>{
    const align = `<alignment${wrap?' wrapText="1"':''}${top?' vertical="top"':''}${h?` horizontal="${h}"`:''}/>`;
    return `<xf numFmtId="0" fontId="${f}" fillId="${fi}" borderId="${b}" xfId="0" applyFont="1" applyFill="1" applyBorder="1" applyAlignment="1">${align}</xf>`;
  }).join('');
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">
<fonts count="${fonts.length}">${fonts.join('')}</fonts>
<fills count="${fills.length}">${fills.join('')}</fills>
<borders count="${borders.length}">${borders.join('')}</borders>
<cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs>
<cellXfs count="${X.length}">${xfXml}</cellXfs>
<cellStyles count="1"><cellStyle name="Normal" xfId="0" builtinId="0"/></cellStyles>
</styleSheet>`;
}

// Style name -> xf index
export const S = { normal:0, wrap:1, title:2, section:3, colheader:4, label:5, center:6, good:7, warn:8, muted:9, subtitle:10, greenbold:11, bold:12 };

// Đổi chuỗi nối bằng " · " thành các bullet xuống dòng thật (dễ đọc trong ô Excel).
// vd bullets('a · b · c') -> "• a\n• b\n• c"
export function bullets(str, mark='•'){
  return String(str).split('·').map(s=>s.trim()).filter(Boolean).map(s=>`${mark} ${s}`).join('\n');
}

// ---------- sheet builder ----------
export class Sheet {
  constructor(name){ this.name=name; this.rows=[]; this.merges=[]; this.cols=null; this.freeze=null; this._r=0; }
  setCols(widths){ this.cols=widths; return this; }          // array of numbers (char width)
  freezeRows(n){ this.freeze=n; return this; }
  // row: array of cell = string | {v, s, num} ; s = style index
  addRow(cells){ this._r++; this.rows.push(cells||[]); return this._r; }
  addBlank(n=1){ for(let i=0;i<n;i++) this.addRow([]); return this; }
  // merge current-ish: mergeCells('A1:D1')
  merge(a1){ this.merges.push(a1); return this; }
  // helper: full-width banner row spanning `span` cols
  banner(text, style, span){ const r=this.addRow([{v:text,s:style}]); if(span>1) this.merge(`A${r}:${colLetter(span)}${r}`); return r; }
  xml(){
    let body='';
    this.rows.forEach((cells,ri)=>{
      const r=ri+1; let cx='';
      cells.forEach((cell,ci)=>{
        if(cell===undefined||cell===null) return;
        const ref=colLetter(ci+1)+r;
        let v,s,isNum=false;
        if(typeof cell==='object'){ v=cell.v; s=cell.s||0; isNum=cell.num||false; }
        else { v=cell; s=0; }
        if(v===''||v===undefined||v===null){ if(s){ cx+=`<c r="${ref}" s="${s}"/>`; } return; }
        if(isNum && typeof v==='number'){ cx+=`<c r="${ref}" s="${s}"><v>${v}</v></c>`; }
        else { cx+=`<c r="${ref}" s="${s}" t="inlineStr"><is><t xml:space="preserve">${esc(v)}</t></is></c>`; }
      });
      body+=`<row r="${r}">${cx}</row>`;
    });
    const colsXml = this.cols ? `<cols>${this.cols.map((w,i)=>`<col min="${i+1}" max="${i+1}" width="${w}" customWidth="1"/>`).join('')}</cols>` : '';
    const mergeXml = this.merges.length ? `<mergeCells count="${this.merges.length}">${this.merges.map(m=>`<mergeCell ref="${m}"/>`).join('')}</mergeCells>` : '';
    let paneXml='';
    if(this.freeze){ paneXml=`<pane ySplit="${this.freeze}" topLeftCell="A${this.freeze+1}" activePane="bottomLeft" state="frozen"/>`; }
    return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">
<sheetViews><sheetView workbookViewId="0" showGridLines="0">${paneXml}</sheetView></sheetViews>
<sheetFormatPr defaultRowHeight="15"/>
${colsXml}<sheetData>${body}</sheetData>${mergeXml}</worksheet>`;
  }
}

export function writeWorkbook(path, sheets){
  const files=[];
  files.push({name:'[Content_Types].xml', data:Buffer.from(
`<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
<Default Extension="xml" ContentType="application/xml"/>
<Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/>
<Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/>
${sheets.map((s,i)=>`<Override PartName="/xl/worksheets/sheet${i+1}.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>`).join('')}
</Types>`,'utf8')});
  files.push({name:'_rels/.rels', data:Buffer.from(
`<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/>
</Relationships>`,'utf8')});
  files.push({name:'xl/workbook.xml', data:Buffer.from(
`<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">
<sheets>${sheets.map((s,i)=>`<sheet name="${esc(s.name)}" sheetId="${i+1}" r:id="rId${i+1}"/>`).join('')}</sheets>
</workbook>`,'utf8')});
  files.push({name:'xl/_rels/workbook.xml.rels', data:Buffer.from(
`<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
${sheets.map((s,i)=>`<Relationship Id="rId${i+1}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet${i+1}.xml"/>`).join('')}
<Relationship Id="rId${sheets.length+1}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>
</Relationships>`,'utf8')});
  files.push({name:'xl/styles.xml', data:Buffer.from(stylesXml(),'utf8')});
  sheets.forEach((s,i)=>files.push({name:`xl/worksheets/sheet${i+1}.xml`, data:Buffer.from(s.xml(),'utf8')}));
  fs.writeFileSync(path, zip(files));
  return path;
}
