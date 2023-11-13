import { Component, Input, Output, OnInit, EventEmitter, TemplateRef, ContentChild, PipeTransform, SimpleChanges, } from '@angular/core';

@Component({
  selector: 'app-simple-datatable',
  templateUrl: './simple-datatable.component.html',
  styleUrls: ['./simple-datatable.component.scss']
})
export class SimpleDatatableComponent implements OnInit {

  @Input() noResult = 'No Results';
  @Input() labelTableau = "";
  @Input() tableauEnTete: any;
  @Input() tableauDonnee: any = [];
  @Input() nbrElementParPage = 5;
  @Input() isDisable?: boolean = false;
  @Input() isDefaultPaginationPage = false;
  @Input() nbrpage = 7;
  @Output() lien = new EventEmitter<any>();
  @Output() selectedLine = new EventEmitter<any>();
  @ContentChild('template') template = {} as TemplateRef<any>;


  colonne: any;
  pageParDefaut = 1;
  pagination: number[] = [];
  paginationAffiche: any;
  dernierePage: any;
  premierePage: any;
  lengthPreviousData: number = 0;


  constructor() { }

  ngOnInit(): void {
    this.colonne = this.tableauEnTete?.map((th: any) => th.id);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(this.isDefaultPaginationPage) {
      this.gotoFirstPage();
    }
  }

  ngAfterContentChecked(): void {
    if (this.tableauDonnee && this.lengthPreviousData !== this.tableauDonnee.length) {
      if (this.pagination.length === 0 || this.pagination.length !== Math.floor(this.tableauDonnee.length / this.nbrElementParPage) + 1) {
        this.generatePagination();
      }
      this.lengthPreviousData = this.tableauDonnee.length;
    }
  }

  generatePagination(): void {
    let nombres = Math.floor(this.tableauDonnee?.length / this.nbrElementParPage);
    if (this.tableauDonnee?.length % this.nbrElementParPage !== 0) {
      nombres += 1;
    }
    if (nombres) {
      this.pagination = Array.from(Array(nombres), (x, i) => i + 1);
      this.paginationAffiche = this.pagination?.slice(0, this.nbrpage);
      this.dernierePage = this.pagination[this.pagination.length - 1];
      this.premierePage = this.pagination[0];
    } else {
      this.pagination = [1];
      this.paginationAffiche = this.pagination?.slice(0, this.nbrpage);
      this.dernierePage = this.pagination[0];
      this.premierePage = this.pagination[0];
    }
  }

  getPagination() {
    let indexDepart = (this.pageParDefaut - 1) * this.nbrElementParPage;
    return this.tableauDonnee?.slice(indexDepart, indexDepart + this.nbrElementParPage);
  }
  /**
   * recupere l'evenement pour un clic sur la ligne
   * @param event - Evenement déclenché lors du clic sur la ligne
   */
  recupereLienLigne(valeur: any): void {
    this.selectedLine.emit({ valeur });
  }

  gotoFirstPage(): void {
    this.recuperePage(this.premierePage);
    this.changePaginationDisplay('precedent');
  }

  recuperePage(p: number): void {
    this.pageParDefaut = p;
    this.changePaginationDisplay('middle');
  }

  previous(): void {
    this.pageParDefaut -= 1;
    this.changePaginationDisplay('precedent');
  }

  goToLastPage(): void {
    this.recuperePage(this.dernierePage);
    this.changePaginationDisplay('suivant');
  }

  next(): void {
    if (this.pageParDefaut != this.dernierePage) {
      this.pageParDefaut += 1;
    }
    this.changePaginationDisplay('suivant');
  }

  changePaginationDisplay(sens: string): void {
    let paginationAfficheMustBeIn = this.paginationAffiche?.slice(1, this.paginationAffiche.length - 1);
    let index = this.pagination.indexOf(this.pageParDefaut);

    if (sens === 'middle' && (this.pageParDefaut !== this.premierePage || this.pageParDefaut !== this.dernierePage)) {
      if (this.pageParDefaut > paginationAfficheMustBeIn[paginationAfficheMustBeIn.length - 1]) {
        sens = 'suivant';
      }
      if (this.pageParDefaut < paginationAfficheMustBeIn[0]) {
        sens = 'precedent';
      }
    }

    if (
      !paginationAfficheMustBeIn?.includes(this.pageParDefaut) ||
      (!!this.paginationAffiche && !this.paginationAffiche.includes(this.pageParDefaut))
    ) {
      switch (sens) {
        case 'suivant':
          this.paginationAffiche = this.pagination.slice(index - this.nbrpage + 2, index + 2);
          break;

        case 'precedent':
          if (index - 1 < 0 || this.pageParDefaut === this.premierePage) {
            this.paginationAffiche = this.pagination.slice(index, index + this.nbrpage);
          } else {
            this.paginationAffiche = this.pagination.slice(index - 1, index + this.nbrpage - 1);
          }
          break;
      }
    }
  }

}
