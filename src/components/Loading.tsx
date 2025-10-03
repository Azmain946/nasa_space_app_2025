import { Search, Book, FileText } from 'lucide-react';

export default function SearchingPublications() {
  return (
    <div className="h-[50vh] bg-gradient-to-br from-indigo-500 via-white/80 to-purple-500 flex items-center justify-center p-4">
      <div className="text-center">
        {/* Animated search icon container */}
        <div className="relative w-32 h-32 mx-auto mb-8">
          {/* Pulsing background circles */}
          <div className="absolute inset-0 bg-indigo-400 rounded-full opacity-20 animate-ping"></div>
          <div className="absolute inset-4 bg-purple-400 rounded-full opacity-30 animate-pulse"></div>
          
          {/* Main icon container */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center shadow-2xl">
            <Search className="w-14 h-14 text-white animate-pulse" />
          </div>
          
          {/* Floating documents */}
          <div className="absolute -top-2 -right-2 animate-bounce" style={{ animationDelay: '0.2s', animationDuration: '2s' }}>
            <div className="bg-white rounded-lg p-2 shadow-lg">
              <Book className="w-6 h-6 text-indigo-500" />
            </div>
          </div>
          
          <div className="absolute -bottom-2 -left-2 animate-bounce" style={{ animationDelay: '0.5s', animationDuration: '2.5s' }}>
            <div className="bg-white rounded-lg p-2 shadow-lg">
              <FileText className="w-6 h-6 text-purple-500" />
            </div>
          </div>
        </div>
        
        {/* Text content */}
        <h2 className="text-3xl font-bold text-gray-800 mb-3">
          Searching Publications
        </h2>
        
        <p className="text-gray-600 mb-6 max-w-md mx-auto">
          We're scanning through thousands of research papers and articles to find exactly what you need
        </p>
        
        {/* Animated progress dots */}
        <div className="flex items-center justify-center space-x-2">
          <div className="w-3 h-3 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
          <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-3 h-3 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
        </div>
        
        {/* Progress bar */}
        <div className="mt-8 max-w-md mx-auto">
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full animate-pulse" 
                 style={{ width: '60%' }}></div>
          </div>
        </div>
        
        {/* Status text */}
        <p className="mt-4 text-sm text-gray-500 font-medium">
          Analyzing results...
        </p>
      </div>
    </div>
  );
}