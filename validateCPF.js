// This class provides a simple way to validate a Brazilian CPF number.
class ValidateCpf {

   // Constructor that sets the CPF number to validate.
   constructor(sentCpf) {
      this.sentCpf = sentCpf;
   }

   // This getter returns the CPF number with all non-digit characters removed.
   get clearedCpf() {
      return this.sentCpf.replace(/\D+/g, '');
   }

   // This method validates the CPF number.
   validate() {
      
      // If the CPF number is undefined or doesn't have 11 digits, it's invalid.
      if (typeof this.clearedCpf === 'undefined') return false;
      if (this.clearedCpf.length !== 11) return false;
      
      // If the CPF number is a sequence of repeated digits, it's invalid.
      if (this.isSequence()) return false;

      // Calculate the two check digits and compare them to the last two digits of the CPF number.
      const partialCpf = this.clearedCpf.slice(0, -2);
      const digitOne = this.createDigit(partialCpf);
      const digitTwo = this.createDigit(partialCpf + digitOne);

      const newCpf = partialCpf + digitOne + digitTwo;

      return newCpf === this.clearedCpf;
   }

   // This method calculates a single check digit based on the partial CPF number.
   createDigit(partialCpf) {
      
      // Convert the partial CPF number to an array and iterate over it to calculate the total.
      const cpfArray = Array.from(partialCpf);
      let regressive = cpfArray.length + 1;
      let total = cpfArray.reduce((ac, value) => {
         ac += (regressive * Number(value));
         regressive--;
         return ac;
      }, 0);

      // Calculate the check digit based on the total and return it.
      const digit = 11 - (total % 11);
      return digit > 9 ? '0' : String(digit);
   }

   // This method checks if the CPF number is a sequence of repeated digits.
   isSequence() {
      const sequence = this.clearedCpf[0].repeat(this.clearedCpf.length);
      return sequence === this.clearedCpf;
   }
}
