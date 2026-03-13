'use client'

export default function DocumentPreview({ content, title }) {
  return (
    <div className="card-base p-8">
      <div className="mb-6">
        <h3 className="text-2xl font-bold font-display text-neutral-100 mb-2">{title}</h3>
        <div className="h-1 w-20 bg-linear-to-r from-accent-500 to-primary-500 rounded"></div>
      </div>

      <div className="bg-white text-neutral-900 p-8 rounded-lg max-h-96 overflow-y-auto font-serif text-sm leading-relaxed">
        {content.split('\n').map((line, idx) => (
          <p key={idx} className={`${line.startsWith(' ') ? 'ml-4' : ''} ${line === '' ? 'mb-3' : 'mb-2'}`}>
            {line || '\u00A0'}
          </p>
        ))}
      </div>

      <div className="mt-6 p-4 bg-neutral-800/50 border border-neutral-700/50 rounded-lg">
        <p className="text-xs text-neutral-400">
          📄 {content.split(' ').length} words | {content.length} characters
        </p>
      </div>
    </div>
  )
}
