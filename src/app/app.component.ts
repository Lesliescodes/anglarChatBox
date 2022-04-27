import { Component } from '@angular/core';
import Pusher from 'pusher-js';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
 styleUrls: ['./app.component.scss']
 
})
export class AppComponent implements onInit {
 username ='username';
 message = '';
 messages = [];

 constructor(private http: HttpClient){

 }

ngOnInit(): void {
  Pusher.logToConsole = true;

  const pusher = new Pusher('e8358221f0f9d7d16d36', {
    cluster: 'us2'
  });

  const channel = pusher.subscribe('chatApp');
  channel.bind('message', data => {
    this.messages.push(data);
  });
}

 submit(): void {
   this.http.post('http://localhost:8000/api/messages', body: {
username: this.username,
message: this.message,
   }).subscribe( next: () => this.message = '' );
 }
}
