function useCleanString(string: string): string {
    const cleanString = string
      .trim() 
      .replace(/\u00A0/g, " ")
      .replace(/[^\w\s\u0600-\u06FF-]/g, "") 
      .replace(/\s+/g, "-") 
      .toLowerCase();
    
    return cleanString;
  }
  
  export default useCleanString;