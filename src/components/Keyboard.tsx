import React from "react";
type SVGKeyboardProps = {
    letter: string;
}
const KEY_ROWS: string[][] = [
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
  ["z", "x", "c", "v", "b", "n", "m",",","."],
  ["Space"],
];
const renderKey = (
    keyLabel: string,
    x: number,
    y:number,
    w:number,
    h:number,
    index:number,
    letter:string
) => {
    if(letter) letter = letter.toLowerCase();
    if(letter === ' ') letter = 'Space'
    console.log(letter)
    console.log(keyLabel)

    const baseFill = letter === keyLabel ? "#e8f4ff" : "#ffffff";
    const stroke = letter === keyLabel ? "#2f80ed" : "#cfcfcf";
    const strokeWidth = letter === keyLabel ? 3 : 1;
    const rx = 8;
    const label =
        keyLabel === "Space" ? "Space" : keyLabel.toUpperCase();
    const overlayFill = letter === keyLabel ? "rgba(47,128,237,0.14)" : "transparent";

    return (
        <g 
            key={keyLabel+index}
            transform={`translate(${x},${y})`}
            style={{pointerEvents:"none"}}
        >
            <rect 
                x={0}
                y={0}
                rx={rx}
                ry={rx}
                width={w}
                height={h}
                fill={baseFill}
                stroke={stroke}
                strokeWidth={strokeWidth}
            />
            <rect x={0} y={0} width={w} height={h} fill={overlayFill} rx={rx} ry={rx} />
            <text
                x={w/2}
                y={h/2+6}
                fontSize={18}
                fontFamily="system-ui, Arial, sans-serif"
                fill={letter === keyLabel ? "#0b57b9" : "#111"}
                textAnchor="middle"
                >
                    {label}
            </text>
        </g>

    )

}
const SVGKeyboard: React.FC<SVGKeyboardProps> = ({letter})=>{
    const svgWidth = 800;
    const rowHeights = 64;
    const keyGap = 8;
    const sidePadding = 12;
    const rows = KEY_ROWS;
    let yCursor= 10;

    const svgRows = React.useMemo(() => {
        const rowNodes: React.ReactNode[] = [];
        rows.forEach((row, rowIndex)=>{
            const totalGaps = (row.length -1) *keyGap;
            const availbleWidth = svgWidth - sidePadding *2 -totalGaps;
            let keyWidth = (availbleWidth/row.length) | 0;
            let keyWidths:number[] = row.map((k)=>
                k=== "space" ? keyWidth * 3 +keyGap * 2: keyWidth
            );
            //reset x to left most position at the start of every row
            let xCursor = sidePadding;

            row.forEach((keyLabel, keyIndex)=>{
                const w = keyWidths[keyIndex];
                rowNodes.push(renderKey(keyLabel, xCursor, yCursor, w, rowHeights - 10, rowIndex * 10 + keyIndex, letter));
                xCursor+= w+keyGap;
            })
            //move yCursor to the next line at the end of each row.
            yCursor += rowHeights;
        })
        return rowNodes;
    }, [letter]);
    return(
        <div style={{ marginTop: 14 }}>
            <svg
            width="100%"
            height={300}
            viewBox={`0 0 ${svgWidth} ${yCursor + 8}`}
            preserveAspectRatio="xMidYMin meet"
            >
                {svgRows}
            </svg>
      </div>
      
    )
}

export default SVGKeyboard;