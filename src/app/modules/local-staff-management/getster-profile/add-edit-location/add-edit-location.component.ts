import { Component, Inject, OnInit, Optional, ViewChild } from '@angular/core';
import * as L from 'leaflet';
import * as E from 'leaflet';
import 'leaflet.locatecontrol';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw';
import { icon } from 'leaflet';

import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import * as Leaflet from 'leaflet';
import { UntypedFormGroup } from '@angular/forms';
import { MatAccordion } from '@angular/material/expansion';
import { ApiService } from 'src/app/shared/services/api/api.service';
import { SnackBarService } from 'src/app/shared/services/snackbar/snackbar.service';

const iconRetinaUrl =
  'https://unpkg.com/leaflet@1.4.0/dist/images/marker-icon-2x.png';
const iconUrl =
  'https://unpkg.com/leaflet@1.4.0/dist/images/marker-icon-2x.png';
const CusLocationUrl =
  'https://unpkg.com/leaflet@1.4.0/dist/images/marker-icon-2x.png';
const UnRegCusLocationUrl =
  'https://unpkg.com/leaflet@1.4.0/dist/images/marker-icon-2x.png';
const shadowUrl =
  'https://unpkg.com/leaflet@1.4.0/dist/images/marker-shadow.png';
//
const iconDefault = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  // CusLocationUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41],
});
L.Marker.prototype.options.icon = iconDefault;

@Component({
  selector: 'app-add-edit-location',
  templateUrl: './add-edit-location.component.html',
  styleUrls: ['./add-edit-location.component.scss'],
})
export class AddEditLocationComponent implements OnInit {
  //* --------------------------  Start  -----------------------------------*//

  //* -----------------------  Decorated Methods  --------------------------*//
  @ViewChild(MatAccordion) accordion: MatAccordion;
  //* -----------------------  Variable Declaration  -----------------------*//
  new_map!: L.Map;
  edit_map!: E.Map;
  lat!: number;
  lng!: number;
  radius: any;
  pts1: any = [];
  history: any = []; // auto
  polygon: any;
  marker: null | any;
  coords: any;
  dist: null | any;
  lat1: any;
  lon1: any;
  lat2: any;
  lon2: any;
  map!: Leaflet.Map;
  lastItem: any;
  locationForm: UntypedFormGroup;
  parentLocationForm: UntypedFormGroup;
  businessLocationName: any = null;
  address: any;
  temp: any;
  locationAddress: any;
  parent_location: any;
  parent_location_coords: any;
  //* ---------------------------  Constructor  ----------------------------*//
  constructor(
    public MatDialogRef: MatDialogRef<AddEditLocationComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    private _service: ApiService,
    private _snakeBar: SnackBarService,
    private api: ApiService
  ) {}

  //* -------------------------  Lifecycle Hooks  --------------------------*//
  ngOnInit() {
    this.addGeofence();
  }

  //* ----------------------------  APIs Methods  --------------------------*//
  getBusinessLocationName(data: any) {
    this.businessLocationName = data;
    // console.log(data);
  }
  addLocation() {
    this._service
      .getsterBizLocationUpdate(this.data, this.lastItem, this.address)
      .subscribe((res) => {
        this._snakeBar.success('Location Updated Successfully');
      });
    this.MatDialogRef.close(this.lastItem);
  }
  addGeofence() {
    this.api.getsterCompleteDetails1(this.data).subscribe((res) => {
      if (res.data[0].gps != null) {
        // console.log('if');

        this.new_map = L.map('new_map', {
          minZoom: 2,
          maxZoom: 18,
        }).setView([res.data[0].gps.x, res.data[0].gps.y], 15);

        L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 18,
          attribution: 'Open Street Map',
          opacity: 0.7,
        }).addTo(this.new_map);

        var add_marker = L.marker([res.data[0].gps.x, res.data[0].gps.y], {
          draggable: true,
          icon: icon({
            iconSize: [25, 41],
            iconAnchor: [13, 41],
            iconUrl: iconUrl,
            popupAnchor: [-3, -24],
            iconRetinaUrl: iconUrl,
          }),
        }).addTo(this.new_map);
        // console.log('last-item', this.lastItem);
        const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${res.data[0].gps.x}&lon=${res.data[0].gps.y}`;
        fetch(url)
          .then((response) => response.json())
          .then((data) => {
            this.address = data.display_name;

            // console.log(`Address: ${this.address}`);
            add_marker.bindPopup(this.address);
          });

        add_marker.on('dragend', (ev) => {
          this.coords = ev.target._latlng;

          this.lat2 = ev.target._latlng.lat;
          this.lon2 = ev.target._latlng.lng;

          this.history = ev.target._latlng;

          this.lat1 = this.pts1.lat;
          this.lon1 = this.pts1.lng;

          this.coords = ev.target._latlng;

          this.lastItem = ev.target._latlng;

          this.lat = ev.target._latlng.lat;
          this.lng = ev.target._latlng.lng;
          // this.draw();

          // console.log('last-item', this.lastItem);
          const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${this.lat}&lon=${this.lng}`;
          fetch(url)
            .then((response) => response.json())
            .then((data) => {
              this.address = data.display_name;

              // console.log(`Address: ${this.address}`);
              add_marker.bindPopup(this.address);
            });
        });
      } else {
        console.log('else');
        navigator.geolocation.getCurrentPosition((position: any) => {
          this.new_map = L.map('new_map', {
            minZoom: 2,
            maxZoom: 18,
          }).setView([position.coords.latitude, position.coords.longitude], 15);

          L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 18,
            attribution: 'Open Street Map',
            opacity: 0.7,
          }).addTo(this.new_map);

          var add_marker = L.marker(
            [position.coords.latitude, position.coords.longitude],
            {
              draggable: true,
              icon: icon({
                iconSize: [25, 41],
                iconAnchor: [13, 41],
                iconUrl: iconUrl,
                popupAnchor: [-3, -24],
                iconRetinaUrl: iconUrl,
              }),
            }
          ).addTo(this.new_map);
          const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${position.coords.latitude}&lon=${position.coords.longitude}`;
          fetch(url)
            .then((response) => response.json())
            .then((data) => {
              this.address = data.display_name;

              // console.log(`Address: ${this.address}`);
              add_marker.bindPopup(this.address);
            });

          add_marker.on('dragend', (ev) => {
            this.coords = ev.target._latlng;

            this.lat2 = ev.target._latlng.lat;
            this.lon2 = ev.target._latlng.lng;

            this.history = ev.target._latlng;

            this.lat1 = this.pts1.lat;
            this.lon1 = this.pts1.lng;

            this.coords = ev.target._latlng;

            this.lastItem = ev.target._latlng;

            this.lat = ev.target._latlng.lat;
            this.lng = ev.target._latlng.lng;
            // this.draw();

            // console.log(this.lastItem);
            const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${this.lat}&lon=${this.lng}`;
            fetch(url)
              .then((response) => response.json())
              .then((data) => {
                this.address = data.display_name;

                // console.log(`Address: ${this.address}`);
                add_marker.bindPopup(this.address);
              });
          });
        });
      }
    });
  }

  //* --------------------------  Public methods  --------------------------*//

  //* ------------------------------ Helper Function -----------------------*//
  close(): void {}

  onNoClick(): void {
    this.MatDialogRef.close(this.lastItem);
  }
  //! -------------------------------  End  --------------------------------!//
}
