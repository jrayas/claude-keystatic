import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import remarkGfm from 'remark-gfm';
import rehypeKatex from 'rehype-katex';
import { BookOpen, FileText, Code, Menu, X, Home } from 'lucide-react';
import 'katex/dist/katex.min.css';

export default function NotionLayout({ title, content, metadata }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const base = import.meta.env.BASE_URL.replace(/\/$/, '');

  const navItems = [
    { label: 'Home', icon: Home, href: `${base}/` },
    { label: 'Blog', icon: FileText, href: `${base}/blog` },
    { label: 'Documentation', icon: BookOpen, href: `${base}/docs` },
    { label: 'Cheatsheets', icon: Code, href: `${base}/cheatsheets` },
  ];

  return (
    <div className="min-h-screen flex bg-white text-slate-800">
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="fixed top-4 left-4 z-50 md:hidden p-2 rounded-lg bg-slate-100 text-slate-700 shadow-sm"
        aria-label="Toggle Sidebar"
      >
        {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      <aside className={`fixed inset-y-0 left-0 z-40 w-64 bg-slate-50 border-r border-slate-200 transform transition-transform duration-200 ease-in-out md:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="h-full flex flex-col p-4">
          <div className="flex items-center gap-2 px-2 py-3 mb-6 border-b border-slate-200/60">
            <div className="w-3 h-3 rounded-full bg-indigo-500"></div>
            <span className="font-semibold text-slate-900 tracking-tight">Digital Garden</span>
          </div>
          <nav className="space-y-1 flex-1">
            {navItems.map((item, idx) => {
              const Icon = item.icon;
              return (
                <a
                  key={idx}
                  href={item.href}
                  className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-slate-600 hover:bg-slate-200/50 hover:text-slate-900 transition-colors"
                >
                  <Icon size={18} className="text-slate-400" />
                  {item.label}
                </a>
              );
            })}
          </nav>
        </div>
      </aside>

      <main className={`flex-1 transition-all duration-200 ${sidebarOpen ? 'md:ml-64' : 'ml-0'} flex justify-center px-4 sm:px-8 py-12`}>
        <div className="w-full max-w-3xl">
          <header className="mb-8 pb-6 border-b border-slate-100">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 mb-2">{title}</h1>
            {metadata && (
              <div className="text-sm text-slate-500 flex items-center gap-4">
                {metadata.publishDate && <span>Published: {metadata.publishDate}</span>}
                {metadata.language && <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-700 font-mono text-xs">{metadata.language}</span>}
              </div>
            )}
          </header>
          <article className="prose prose-slate max-w-none">
            <ReactMarkdown
              remarkPlugins={[remarkMath, remarkGfm]}
              rehypePlugins={[rehypeKatex]}
            >
              {content}
            </ReactMarkdown>
          </article>
        </div>
      </main>
    </div>
  );
}
