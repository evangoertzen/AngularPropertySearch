import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-analysis',
  templateUrl: './analysis.component.html',
  styleUrl: './analysis.component.css',
  standalone: false
})
export class AnalysisComponent implements OnInit{

  public mls_id: string | null = "";

  constructor(
    private route: ActivatedRoute
  ){}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      this.mls_id = params.get('mls_id');
      console.log('mls_id: ', this.mls_id); // `id` will be `null` if not passed
    });
  }
}
