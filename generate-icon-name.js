import fs from 'fs'
import path from 'path'

const iconsFolder = path.join(process.cwd(), 'public/icons')
const iconFiles = fs.readdirSync(iconsFolder)

const iconNames = iconFiles
  .filter((file) => file.endsWith('.svg'))
  .map((file) => path.basename(file, '.svg'))

const typeContent = `export type IconNames = ${iconNames
  .map((name) => `'${name}'`)
  .join(' | ')};`

const typeFilePath = path.join(process.cwd(), 'src/constant/icon.type.ts')
fs.writeFileSync(typeFilePath, typeContent)

console.log(`Created successfully! Here your file: file://${typeFilePath}`)
