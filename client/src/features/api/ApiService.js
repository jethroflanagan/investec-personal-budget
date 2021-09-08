import axios from 'axios';

class ApiService {
  baseUrl = "http://localhost:3000/";
  
  api;

  constructor() {
    this.api = axios.create({
      baseURL: this.baseUrl,
      timeout: 1000,
    });
  }

  async handleResponse(request) {
    const response = await request;
    // TODO: handle errors
    return response.data;
  }

  get(...args) {
    return this.handleResponse(this.api.get(...args));
  }
  
  post(...args) {
    return this.handleResponse(this.api.post(...args));
  }  

  patch(...args) {
    return this.handleResponse(this.api.patch(...args));
  }

  getAllUsers() {
    return this.get('users')
  }

  getAllGroups() {
    return this.get('groups')
  }

  getGroup(id) {
    return this.get(`groups/${id}`)
  }

  getExpense(id) {
    return this.get(`expenses/${id}`)
  }

  getAllCategories() {
    return this.get('categories')
  }  
  
  getAllBankTransactions() {
    return this.get('transactions')
  }
  
  getAllExpenses() {
    return this.get('expenses')
  }

  getAllMerchants() {
    return this.get('merchants')
  }

  addCategory(name) {
    // return this.post(
  }

  createExpenseWithBankTransaction({ userId, investecTransactionId, description, categoryName, groupId }) {
    return this.post('expenses', { userId, investecTransactionId, description, categoryName, groupId })
  }

  updateCustomExpense({ expenseId, userId, amount, description, categoryName, groupId }) {
    return this.patch(`expenses/${expenseId}`, { userId, amount, description, categoryName, groupId })
  }
}

export const api = new ApiService();
