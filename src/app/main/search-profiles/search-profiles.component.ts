import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import ProfilesService from "../profiles.service";

/**
 * estrarre in un altro componente
 */


@Component({
    selector: 'app-search-profiles',
    templateUrl: './search-profiles.component.html',
    styleUrls: ['./search-profiles.component.css']
})
export class SearchProfilesComponent implements OnInit {
    daCercare: string;
    inizioNomeDaCercare = 17;
    constructor(private profilesService: ProfilesService, private route: Router){}
    /**
     * prendo il nome del profilo da ricercare dall'url,
     * faccio la richiesta al back-end dei profili che hanno nickname simile a 
     * quello ricercato e li mostro nella pagina
     */
    ngOnInit() {
        this.daCercare = this.route.url.substring(this.inizioNomeDaCercare,
            this.route.url.length);
        console.log(this.daCercare)
        /**
         * chiamata al backend
         */
        this.profilesService.fetchAccountsSearch(this.daCercare);

    }
}