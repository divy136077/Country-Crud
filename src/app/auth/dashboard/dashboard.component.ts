import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ChartType, ChartOptions } from 'chart.js';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from './../../services/api-services.service';
import { Label, SingleDataSet} from 'ng2-charts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  allData: any = '';
/**
 * dashboard pia chart add 
 */
  pieChartColor: any = [
    {
      backgroundColor: ['rgba(30, 169, 224, 0.8)','rgba(255,165,0,0.9)']
    }
  ]

  public pieChartLabels: Label[] = ['Active Users', 'InActive'];
  public pieChartData: SingleDataSet = [];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];

  public pieChartOptions: ChartOptions = {
    responsive: true,
  };

  constructor(
    private http: HttpClient,
    private serviceAPI: ApiService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) {

  }


  ngOnInit() {
/**
 * find  user all data 
 */
    this.serviceAPI.getAll().subscribe((res: any) => {
      this.allData = res;
      this.pieChartData.push(res.activeUser);
      this.pieChartData.push(res.inactiveUser);
    });
  }




}
