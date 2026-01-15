import type { FileType } from '../upload-data-system/types'

const SupportedFormatsInfo = () => {
  return (
    <div className="mt-8 p-4 bg-neutral-100 dark:bg-neutral-800 rounded-lg">
      <h3 className="font-medium text-neutral-800 dark:text-neutral-200 mb-2">Supported Formats</h3>
      <ul className="text-sm text-neutral-600 dark:text-neutral-400 space-y-1">
        <li><strong>.json</strong> - Standard JSON data files</li>
        <li><strong>.jsonc</strong> - JSON with comments (comments will be stripped)</li>
        <li><strong>.csv</strong> - Comma-separated values (first row as headers)</li>
        <li><strong>.txt</strong> - Plain text files</li>
      </ul>
    </div>
  )
}

export default SupportedFormatsInfo
