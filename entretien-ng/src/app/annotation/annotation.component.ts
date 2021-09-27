import { Component, OnInit, ViewChild } from '@angular/core';
import { Annotation, NgxAnnotateTextComponent } from 'ngx-annotate-text';

import { FormControl } from '@angular/forms';

import { DjangoService } from '../django.service';

@Component({
  selector: 'app-annotation',
  templateUrl: './annotation.component.html',
  styleUrls: ['./annotation.component.css']
})
export class AnnotationComponent implements OnInit {

  @ViewChild('annotateText') ngxAnnotateText: NgxAnnotateTextComponent;

  category = new FormControl('');
  color = "#E6707B";

  text = new FormControl("Conception, implémentation et conﬁguration d'une approche de discussion en texte libre dans 3 langues dialectes (arabe tunisien ,français et anglais) et toute combinaison hybride de ces 2 langues dans ungestionnaire de ChatBot dans le domaine bancaire.\n Mise en place d’une application de recommandation et de classification des profils Linkedin à partir d’une base de données pour les besoins de recrutement RH . technologies: Python , NLP , Machine Learning , Django , MongoDB  ")
  chosen_text;

  all_categories = []
  selected_category = null;

  constructor(private service: DjangoService) { }

  ngOnInit(): void {
  }

  annotations: Annotation[] = [
  ];

  addAnnotation() {

    if (this.selected_category != null) {
      let selection = this.ngxAnnotateText.getCurrentTextSelection();
      if (selection) {
        this.annotations = this.annotations.concat(
          new Annotation(selection.startIndex, selection.endIndex, this.selected_category.category, this.selected_category.color)
        )
        console.log(this.annotations)
      }
    }

    else {
      alert("please add and select a category")
    }
  }

  selectCategory(elem) {
    this.selected_category = elem
  }

  onClick() {

    this.all_categories.push({
      "category": this.category.value,
      "color": this.color
    });

    this.category.setValue("")
  }

  onAddText() {
    this.chosen_text = null
    this.annotations = []
    this.chosen_text = this.text.value.trim()
  }

  submitText() {
    let data_post = {
      "text": this.chosen_text,
      "annotations": this.annotations
    }
    this.service.render_json(data_post).subscribe((data) => {
      let str = JSON.stringify(data);
      let bytes = new TextEncoder().encode(str);
      let blob = new Blob([bytes], {
        type: "application/json;charset=utf-8"
      });

      let url = URL.createObjectURL(blob)

      this.downloadURI(url, "annotations.json");

    })
  }
  downloadURI(uri, name) {
    var link = document.createElement("a");
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

}
