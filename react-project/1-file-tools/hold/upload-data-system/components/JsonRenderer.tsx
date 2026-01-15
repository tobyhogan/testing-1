interface JsonRendererProps {
  data: unknown
  expandedKeys: Set<string>
  onToggleExpand: (key: string) => void
}

const JsonRenderer = ({ data, expandedKeys, onToggleExpand }: JsonRendererProps) => {
  const renderValue = (value: unknown, keyPath: string, depth: number = 0): JSX.Element => {
    const indent = depth * 20

    if (value === null) {
      return <span className="text-neutral-500 italic">null</span>
    }

    if (value === undefined) {
      return <span className="text-neutral-500 italic">undefined</span>
    }

    if (typeof value === 'boolean') {
      return <span className="text-purple-600 dark:text-purple-400">{value.toString()}</span>
    }

    if (typeof value === 'number') {
      return <span className="text-blue-600 dark:text-blue-400">{value}</span>
    }

    if (typeof value === 'string') {
      return <span className="text-green-600 dark:text-green-400">"{value}"</span>
    }

    if (Array.isArray(value)) {
      const isExpanded = expandedKeys.has(keyPath)
      
      if (value.length === 0) {
        return <span className="text-neutral-500">[]</span>
      }

      return (
        <div>
          <button
            onClick={() => onToggleExpand(keyPath)}
            className="text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors"
          >
            {isExpanded ? '▼' : '▶'} Array ({value.length} items)
          </button>
          {isExpanded && (
            <div className="border-l-2 border-neutral-300 dark:border-neutral-600 ml-2">
              {value.map((item, index) => (
                <div key={index} style={{ paddingLeft: indent + 16 }} className="py-1">
                  <span className="text-neutral-500 mr-2">[{index}]:</span>
                  {renderValue(item, `${keyPath}.${index}`, depth + 1)}
                </div>
              ))}
            </div>
          )}
        </div>
      )
    }

    if (typeof value === 'object') {
      const keys = Object.keys(value as Record<string, unknown>)
      const isExpanded = expandedKeys.has(keyPath)

      if (keys.length === 0) {
        return <span className="text-neutral-500">{'{}'}</span>
      }

      return (
        <div>
          <button
            onClick={() => onToggleExpand(keyPath)}
            className="text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors"
          >
            {isExpanded ? '▼' : '▶'} Object ({keys.length} keys)
          </button>
          {isExpanded && (
            <div className="border-l-2 border-neutral-300 dark:border-neutral-600 ml-2">
              {keys.map(key => (
                <div key={key} style={{ paddingLeft: indent + 16 }} className="py-1">
                  <span className="text-amber-600 dark:text-amber-400 font-medium mr-2">{key}:</span>
                  {renderValue((value as Record<string, unknown>)[key], `${keyPath}.${key}`, depth + 1)}
                </div>
              ))}
            </div>
          )}
        </div>
      )
    }

    return <span className="text-neutral-600 dark:text-neutral-400">{String(value)}</span>
  }

  return (
    <div className="font-mono text-sm">
      {renderValue(data, 'root', 0)}
    </div>
  )
}

export default JsonRenderer
