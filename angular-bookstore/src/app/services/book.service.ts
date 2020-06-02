import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Book } from '../common/book';
import { BookCategory } from '../common/book-category';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  
  private baseUrl = "http://localhost:8080/api/v1/books";
  private categoryUrl = "http://localhost:8080/api/v1/book-category";

  constructor(private httpClient: HttpClient) {}
 
  getBooks(theCategoryId: number) : Observable<Book[]> {
    const searchUrl = `${this.baseUrl}/search/categoryid?id=${theCategoryId}`;
    return this.getBooksList(searchUrl);
  }

  private getBooksList(searchUrl: string): Observable<Book[]> {
    return this.httpClient.get<GetBooksResponse>(searchUrl).pipe(map(response => response._embedded.books));
  }

  getBookCategories() : Observable<BookCategory[]> {
    return this.httpClient.get<GetBookCategoryResponse>(this.categoryUrl).pipe(
      map(response => response._embedded.bookCategory)
    );
  }

  searchBooks(keyword: string) : Observable<Book[]> {
    const searchUrl = `${this.baseUrl}/search/searchbykeyword?name=${keyword}`;
    return this.getBooksList(searchUrl);
  }

  get(id: number) : Observable<Book> {
    const bookUrl = `${this.baseUrl}/${id}`;
    return this.httpClient.get<Book>(bookUrl);
  }
}

interface GetBooksResponse {
  _embedded : {
    books : Book[];
  }
}

interface GetBookCategoryResponse {
  _embedded : {
    bookCategory : BookCategory[];
  }
}