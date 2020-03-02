import { Component, ViewChild, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, AbstractControl, Validators } from '@angular/forms';

import { faSearch } from '@fortawesome/free-solid-svg-icons';

import { Subject } from "rxjs";

import { DataTableDirective } from "angular-datatables";
import { DatatableComponent, ColumnMode, SelectionType } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-tablas',
  templateUrl: './tablas.component.html',
  styleUrls: ['./tablas.component.scss']
})
export class TablasComponent implements OnInit, AfterViewInit, OnDestroy {
  public faSearch = faSearch;

  public items:Array<{id:number,titulo:string}>= new Array<{id:number,titulo:string}>();
  public itemsFiltrados:Array<{id:number,titulo:string}>= new Array<{id:number,titulo:string}>();

  @ViewChild(DataTableDirective, {read: false, static: false}) dtElement: DataTableDirective;

  public totalItems:number = 10;

  dtOptions: any = {
		colReorder: true,
    pagingType: 'full_numbers',
    pageLength: 10,
    language: {
      processing: "Procesando...",
      search: "Buscar:",
      lengthMenu: "Mostrar _MENU_ elementos",
      info: "Mostrando desde _START_ al _END_ de _TOTAL_ elementos",
      infoEmpty: "Mostrando ningún elemento.",
      infoFiltered: "(filtrado _MAX_ elementos total)",
      infoPostFix: "",
      loadingRecords: "Cargando registros...",
      zeroRecords: "No se encontraron registros",
      emptyTable: "No hay datos disponibles en la tabla",
      paginate: {
        first: "Primero",
        previous: "Anterior",
        next: "Siguiente",
        last: "Último"
      },
      aria: {
        sortAscending: ": Activar para ordenar la tabla en orden ascendente",
        sortDescending: ": Activar para ordenar la tabla en orden descendente"
      }
    },      
  };

  dtTrigger: Subject<any> = new Subject();

  @ViewChild(DatatableComponent, { static: false }) dataTable: DatatableComponent

  public selected = [];

  public ColumnMode = ColumnMode;
  public SelectionType = SelectionType;

  public juecesFormGroup: FormGroup;

  constructor(private formBuilder:FormBuilder) { 
    this.juecesFormGroup = this.formBuilder.group({
      'filtro': ['']
    });
  }

  ngOnInit() {
  	for (var i = 1; i<101;i++) {
	  	let item1 = {id:i,titulo:"Título Prog "+i};
		  this.items.push(item1);
		  this.itemsFiltrados.push(item1);
  	}
  }
  
  public onChange(total:number):void {
  	this.totalItems = total;
  	console.log(this.totalItems);
  }

  ngAfterViewInit(): void {
  	console.log(this.dtElement);
    this.dtTrigger.next();
	}

	public rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
    	console.log(dtInstance);
			// Destroy the table first
	    dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });
  }

  public onSelect(event):void {
    console.log('Select Event', event);
  }

  public filtrar(event) {
    const val = event.target.value.toLowerCase();
    console.log(val);
    // Filtrar según el name
    const temp = this.items.filter(function(d) {
      return d.titulo.toLowerCase().indexOf(val) !== -1 || !val;
    });
    // Actualizar las filas, los registros
    this.itemsFiltrados = temp;
    // Volver a la página 1 de la tabla
    this.dataTable.offset = 0;
  }

	ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

}