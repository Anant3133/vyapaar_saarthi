const fs = require('fs')
const path = require('path')

const directoryPath = path.join(__dirname, 'src') // scans the entire src folder

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(file => {
    const fullPath = path.join(dir, file)
    if (fs.statSync(fullPath).isDirectory()) {
      walkDir(fullPath, callback)
    } else {
      callback(fullPath)
    }
  })
}

walkDir(directoryPath, (filePath) => {
  if (filePath.endsWith('.ts') || filePath.endsWith('.tsx')) {
    let content = fs.readFileSync(filePath, 'utf8')

    const newContent = content.replace(
      /(['"])..\/..\/..\/..\/..\/Personal Dashboard Application\/(.*?)\1/g,
      (match, quote, importPath) => {
        // Change "@/..." below if your alias or relative path is different
        return `${quote}@/${importPath}${quote}`
      }
    )

    if (newContent !== content) {
      console.log(`Fixed imports in: ${filePath}`)
      fs.writeFileSync(filePath, newContent, 'utf8')
    }
  }
})
