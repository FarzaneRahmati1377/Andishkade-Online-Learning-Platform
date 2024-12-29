function useToPersianDigits(num: number): string {
    
    return  num.toString().replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[+d]); ;
  }
  
  export default useToPersianDigits;