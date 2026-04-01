import { Component, OnInit } from '@angular/core';
import { FeesReportResponse } from 'src/app/Modules/Fees/Report/DateWiseReport';

@Component({
  selector: 'app-PrintCashReceipt',
  templateUrl: './PrintCashReceipt.component.html',
  styleUrls: ['./PrintCashReceipt.component.scss'],
  standalone: false,
})
export class PrintCashReceiptComponent implements OnInit {
  public heading: string = 'FEES RECEIPT';
  public data: FeesReportResponse = new FeesReportResponse();
  constructor() {}

  ngOnInit() {
    const jsonValue = localStorage.getItem('PrintCashReceipt');
    if (jsonValue) {
      this.data = JSON.parse(jsonValue);
      setTimeout(() => window.print(), 500);
    }
  }
  public convertAmountToWords(amount: number): string {
    if (amount === null || amount === undefined || isNaN(amount)) {
      return '';
    }

    if (amount === 0) {
      return 'Zero Only';
    }

    const ones: string[] = [
      '',
      'One',
      'Two',
      'Three',
      'Four',
      'Five',
      'Six',
      'Seven',
      'Eight',
      'Nine',
      'Ten',
      'Eleven',
      'Twelve',
      'Thirteen',
      'Fourteen',
      'Fifteen',
      'Sixteen',
      'Seventeen',
      'Eighteen',
      'Nineteen',
    ];

    const tens: string[] = [
      '',
      '',
      'Twenty',
      'Thirty',
      'Forty',
      'Fifty',
      'Sixty',
      'Seventy',
      'Eighty',
      'Ninety',
    ];

    const convertBelowThousand = (num: number): string => {
      let word = '';

      if (num >= 100) {
        word += ones[Math.floor(num / 100)] + ' Hundred ';
        num = num % 100;
      }

      if (num >= 20) {
        word += tens[Math.floor(num / 10)] + ' ';
        num = num % 10;
      }

      if (num > 0) {
        word += ones[num] + ' ';
      }

      return word.trim();
    };

    const convertNumber = (num: number): string => {
      if (num === 0) {
        return '';
      }

      let result = '';

      const crore = Math.floor(num / 10000000);
      num %= 10000000;

      const lakh = Math.floor(num / 100000);
      num %= 100000;

      const thousand = Math.floor(num / 1000);
      num %= 1000;

      const hundred = num;

      if (crore > 0) {
        result += convertBelowThousand(crore) + ' Crore ';
      }

      if (lakh > 0) {
        result += convertBelowThousand(lakh) + ' Lakh ';
      }

      if (thousand > 0) {
        result += convertBelowThousand(thousand) + ' Thousand ';
      }

      if (hundred > 0) {
        result += convertBelowThousand(hundred) + ' ';
      }

      return result.trim();
    };

    const integerPart = Math.floor(amount);
    const decimalPart = Math.round((amount - integerPart) * 100);

    let words = convertNumber(integerPart) + ' Rupees';

    if (decimalPart > 0) {
      words += ' and ' + convertNumber(decimalPart) + ' Paise';
    }

    return words.trim() + ' Only';
  }
}
