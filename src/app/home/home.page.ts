import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  @ViewChild(IonContent) content: IonContent;
  private textInput: HTMLInputElement;
  public value = 0;
  public customPer = 10;
  constructor() {}

  ngOnInit() {
    this.textInput = document.getElementById('textInput') as HTMLInputElement;
  }

  public scrollTo(top: boolean) {
    if (top) {
      this.content.scrollToTop(900);
    } else {
      this.content.scrollToBottom(900);
    }
  }

  private applyNumberFormat(value: string): string {
    return '$' + Number(value).toLocaleString('es-CL');
  }

  private updateSII() {
    const total = Math.round(this.value / (1 - 0.1075));

    (document.getElementById(
      'siiTotalInput'
    ) as HTMLInputElement).value = this.applyNumberFormat(String(total));

    (document.getElementById(
      'siiPartialInput'
    ) as HTMLInputElement).value = this.applyNumberFormat(
      String(total - this.value)
    );
  }

  private updateIVA() {
    const total = Math.round(this.value * 0.19);
    (document.getElementById(
      'ivaTotalInput'
    ) as HTMLInputElement).value = this.applyNumberFormat(
      String(total + this.value)
    );
  }

  private updateCustom() {
    const total = Math.round(this.value * (this.customPer / 100));
    (document.getElementById(
      'customTotalInput'
    ) as HTMLInputElement).value = this.applyNumberFormat(
      String(total + this.value)
    );
  }

  public setPer(event: any) {
    this.customPer = Number(event.path[0].value);
    this.updateCustom();
  }

  public addDigit(digit: number | string) {
    if (digit === 'Clear') {
      this.value = 0;
      this.textInput.value = '0';
    }
    if (String(this.value).length < 14) {
      if (typeof digit === 'number') {
        this.value = Number(this.value + digit.toString());
      } else if (typeof digit === 'string') {
        if (digit === 'c') {
          this.value = Number(
            this.value.toString().substring(0, this.value.toString().length - 1)
          );
        } else if (digit === '00') {
          this.value = Number(this.value + digit);
        }
      }
    } else {
      if (digit === 'c') {
        this.value = Number(
          this.value.toString().substring(0, this.value.toString().length - 1)
        );
      }
    }
    this.textInput.value = this.applyNumberFormat(String(this.value));
    this.updateSII();
    this.updateIVA();
    this.updateCustom();
  }
}
