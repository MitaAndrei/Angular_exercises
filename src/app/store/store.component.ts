import { Component } from '@angular/core';
import { Store }  from '../../models/store';
import { StoreService } from '../../services/store.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-store',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './store.component.html',
  styleUrl: './store.component.scss'
})
export class StoreComponent {
  stores : Store[] = [];
  emptyStore : Store = {id: undefined, name:'', country:'', city:'', activeSince: new Date, ownerName: '', monthlyIncome:0}
  store : Store = {...this.emptyStore};
  showCreateForm : boolean = false;
  showEditForm : boolean = false;
  beingEdited : Store = {...this.emptyStore};
  input : string = '';

  constructor(private storeService : StoreService) { }
  ngOnInit(): void {
    this.getAllStores()
  }

  toggleCreateForm(){
    this.showCreateForm = !this.showCreateForm;
    this.showEditForm = false;
  }

  toggleEditForm(store: Store){
    this.showCreateForm = false;
    this.beingEdited = {...store};
    this.showEditForm = !this.showEditForm;
  }

  getAllStores(){
    this.storeService.GetAllStores().subscribe(stores => {
      console.log(stores)
      this.stores = stores;
    });
    console.log(this.store)
  }

  createStore(){
    this.storeService.CreateStore(this.store).subscribe(stores => {
      this.getAllStores();
      this.store = {...this.emptyStore}
    });
    this.showCreateForm = false;
  }

  DeleteStore(id?: string) {
    this.storeService.DeleteStore(id).subscribe(() => this.getAllStores())
  }

  UpdateStore(store : Store){
    this.storeService.UpdateStore(store).subscribe(() => this.getAllStores());
    this.showEditForm = false;
    this.beingEdited = {...this.emptyStore}
  }

  SearchStore(input: string){
    if (input === ''){
      this.getAllStores();
      return;
    }
    this.storeService.SearchStore(input).subscribe(stores =>{
      this.stores = stores});
  }

  SortByIncome(){
    this.storeService.SortByIncome().subscribe(
      stores => this.stores = stores
    )
  }

  GetOldestStore(){
    this.storeService.GetOldestStore().subscribe(store => this.stores = [store]);
  }
}
