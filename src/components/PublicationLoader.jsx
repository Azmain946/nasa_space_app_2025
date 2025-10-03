const PublicationSkeleton = () => {
    return (
      <div className="publication-page">
        <div className="publication-container">
          {/* Header Skeleton */}
          <div className="publication-header">
            <div className="h-12 bg-gradient-to-r from-white/10 to-white/5 rounded-lg mb-4 animate-pulse"></div>
            <div className="publication-meta">
              <div className="h-4 w-64 bg-white/10 rounded animate-pulse"></div>
              <span> • </span>
              <div className="h-4 w-24 bg-white/10 rounded animate-pulse"></div>
              <div className="h-4 w-32 bg-white/10 rounded animate-pulse"></div>
            </div>
          </div>
  
          {/* Keywords Section Skeleton */}
          <div className="text-center mb-6">
            <div className="flex justify-center items-center mb-4 gap-5">
              <div className="h-6 w-32 bg-white/10 rounded animate-pulse"></div>
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="h-8 w-24 bg-white/10 rounded-full animate-pulse"
                  style={{ animationDelay: `${i * 0.1}s` }}
                ></div>
              ))}
            </div>
          </div>
  
          <div className="publication-grid">
            {/* Left Column Skeleton */}
            <div className="space-y-4">
              {/* Summary Card Skeleton */}
              <div className="publication-card">
                <div className="flex justify-between items-center mb-3">
                  <div className="h-6 w-24 bg-white/10 rounded animate-pulse"></div>
                  <div className="flex gap-2">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="h-8 w-20 bg-white/10 rounded animate-pulse"
                        style={{ animationDelay: `${i * 0.1}s` }}
                      ></div>
                    ))}
                  </div>
                </div>
  
                {/* Abstract Box Skeleton */}
                <div
                  className="mb-4 p-4 rounded-lg border-l-4 border-[#2fb2ff]"
                  style={{
                    background:
                      "linear-gradient(90deg, rgba(11,20,68,0.18), rgba(11,20,68,0.08))",
                  }}
                >
                  <div className="h-5 w-24 bg-white/10 rounded mb-2 animate-pulse"></div>
                  <div className="space-y-2">
                    <div className="h-3 bg-white/10 rounded animate-pulse"></div>
                    <div className="h-3 bg-white/10 rounded animate-pulse w-11/12"></div>
                    <div className="h-3 bg-white/10 rounded animate-pulse w-10/12"></div>
                  </div>
                </div>
  
                {/* Summary Content Skeleton */}
                <div className="space-y-3">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div
                      key={i}
                      className="h-3 bg-white/10 rounded animate-pulse"
                      style={{
                        width: `${85 + Math.random() * 15}%`,
                        animationDelay: `${i * 0.05}s`,
                      }}
                    ></div>
                  ))}
                </div>
              </div>
  
              {/* Audio Player Skeleton */}
              <div className="publication-card">
                <div className="h-5 w-32 bg-white/10 rounded mb-3 animate-pulse"></div>
                <div className="h-16 bg-gradient-to-r from-white/10 to-white/5 rounded-lg animate-pulse"></div>
              </div>
  
              {/* Knowledge Graph Skeleton */}
              <div className="publication-card">
                <div className="h-5 w-40 bg-white/10 rounded mb-4 animate-pulse"></div>
                <div className="h-64 bg-gradient-to-br from-white/10 via-white/5 to-white/10 rounded-lg animate-pulse"></div>
              </div>
            </div>
  
            {/* Right Sidebar Skeleton */}
            <aside className="space-y-4">
              {/* Action Tabs Skeleton */}
              <div className="publication-card">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="w-full h-12 mb-2 bg-gradient-to-r from-white/10 to-white/5 rounded-lg animate-pulse"
                    style={{ animationDelay: `${i * 0.1}s` }}
                  ></div>
                ))}
              </div>
  
              {/* FAQ Skeleton */}
              <div className="publication-card">
                <div className="h-6 w-48 bg-white/10 rounded mb-3 animate-pulse"></div>
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="border-t border-white/5 py-4"
                    style={{ animationDelay: `${i * 0.1}s` }}
                  >
                    <div className="flex justify-between items-center">
                      <div className="h-4 w-3/4 bg-white/10 rounded animate-pulse"></div>
                      <div className="h-4 w-4 bg-white/10 rounded animate-pulse"></div>
                    </div>
                  </div>
                ))}
              </div>
  
              {/* Quick Links Skeleton */}
              <div className="publication-card">
                <div className="h-5 w-28 bg-white/10 rounded mb-3 animate-pulse"></div>
                <div className="space-y-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="h-4 bg-white/10 rounded animate-pulse"
                      style={{
                        width: `${60 + Math.random() * 20}%`,
                        animationDelay: `${i * 0.05}s`,
                      }}
                    ></div>
                  ))}
                </div>
              </div>
  
              {/* Related Publications Skeleton */}
              <div className="publication-card">
                <div className="h-5 w-40 bg-white/10 rounded mb-3 animate-pulse"></div>
                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="p-1 border-b border-white/5"
                      style={{ animationDelay: `${i * 0.1}s` }}
                    >
                      <div className="h-3 bg-white/10 rounded mb-2 animate-pulse"></div>
                      <div className="h-3 w-2/3 bg-white/10 rounded animate-pulse"></div>
                    </div>
                  ))}
                </div>
              </div>
  
              {/* Chat Widget Skeleton */}
              <div className="publication-card">
                <div className="h-5 w-32 bg-white/10 rounded mb-3 animate-pulse"></div>
                <div className="h-32 bg-gradient-to-r from-white/10 to-white/5 rounded-lg animate-pulse"></div>
              </div>
            </aside>
          </div>
        </div>
  
        <style>{`
          .publication-page {
            min-height: 100vh;
            background: linear-gradient(135deg, #0b1444 0%, #1a2559 100%);
            padding: 2rem 1rem;
          }
  
          .publication-container {
            max-width: 1400px;
            margin: 0 auto;
          }
  
          .publication-header {
            text-align: center;
            margin-bottom: 2rem;
            padding-bottom: 2rem;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          }
  
          .publication-meta {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 1rem;
            flex-wrap: wrap;
            color: rgba(255, 255, 255, 0.6);
            margin-top: 1rem;
          }
  
          .publication-grid {
            display: grid;
            grid-template-columns: 1fr 380px;
            gap: 2rem;
          }
  
          @media (max-width: 1024px) {
            .publication-grid {
              grid-template-columns: 1fr;
            }
          }
  
          .publication-card {
            background: rgba(30, 42, 110, 0.3);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 1rem;
            padding: 1.5rem;
            backdrop-filter: blur(10px);
            margin-bottom: 1rem;
          }
  
          @keyframes pulse {
            0%, 100% {
              opacity: 1;
            }
            50% {
              opacity: 0.5;
            }
          }
  
          .animate-pulse {
            animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
          }
        `}</style>
      </div>
    );
  };
  
  export default PublicationSkeleton;