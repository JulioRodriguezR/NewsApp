import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

import { Storage } from '@ionic/storage';

import { Article } from '../models/models';

@Injectable({
    providedIn: 'root',
})
export class DataLocalService {
    news: Article[] = [];

    constructor(private storage: Storage, public toastCtr: ToastController) {
        this.loadFavorites();
    }

    async presentToast(message: string) {
        const toast = await this.toastCtr.create({
            message,
            duration: 1000,
        });
        toast.present();
    }

    saveNew(evNew: Article) {
        const exists = this.news.find(i => i.title === evNew.title);
        if (!exists) {
            this.news.unshift(evNew);
            this.storage.set('favorites', this.news);
        }

        this.presentToast('Add to favorites');
    }

    async loadFavorites() {
        const favorites = await this.storage.get('favorites');
        if (favorites) {
            this.news = favorites;
        }
    }

    deleteNew(evNew: Article) {
        this.news = this.news.filter(i => i.title !== evNew.title);
        this.storage.set('favorites', this.news); // lo que quede del []
        this.presentToast('Delete favorite article');
    }
}
