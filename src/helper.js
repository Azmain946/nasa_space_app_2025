export const getDriveFileId = (shareUrl) => {
    if (!shareUrl) return null;
  
    // Match /file/d/FILE_ID/ format
    let match = shareUrl.match(/\/d\/([a-zA-Z0-9_-]+)\//);
    if (match) return match[1];
  
    // Match id=FILE_ID format (Googleusercontent links)
    match = shareUrl.match(/[?&]id=([a-zA-Z0-9_-]+)/);
    if (match) return match[1];
  
    // No match
    return null;
  };