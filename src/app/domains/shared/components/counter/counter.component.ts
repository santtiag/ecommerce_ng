import { Component, Input, Renderer2, SimpleChanges, signal } from '@angular/core';

@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [CounterComponent],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.css'
})
export class CounterComponent {
  @Input({ required: true }) duration: number = 0;
  @Input({ required: true }) message: string = '';
  counter = signal(0);
  counterRef: number | undefined

  constructor() {
    // No async
    // Before render
    console.log('Constructor');
    console.log('-'.repeat(10));


  }

  ngOnChanges(changes: SimpleChanges) {
    // Before and during render
    console.log('ngOnChanges');
    console.log('-'.repeat(10));
    const duration = changes['duration'];
    console.log(duration);
    if (duration) {
      this.doSomething()
    }


  }

  ngOnInit() {
    // After render
    // One time
    // Async, then, subs
    console.log('ngOnInit');
    console.log('-'.repeat(10));
    console.log('Duration =>' + this.duration);
    console.log('Message =>' + this.message);
    this.counterRef = window.setInterval(() => {
      console.log('Run interval');
      this.counter.update(statePrev => statePrev + 1);
    }, 2000)

  }

  ngAfterViewInit() {
    // After render
    // Childs were already painted
    console.log('ngAfterViewInit');
    console.log('-'.repeat(10));

  }

  ngOnDestroy() {
    console.log('ngOnDestroy');
    console.log('-'.repeat(10));
    window.clearInterval(this.counterRef);

  }

  doSomething() {
    console.log('Se cambio');
  }

}
