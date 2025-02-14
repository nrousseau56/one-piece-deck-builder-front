import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule, HttpErrorResponse} from '@angular/common/http';
import {RouterModule} from '@angular/router';

import {AppRoutingModule} from './app.routing';

import {AppComponent} from './app.component';

import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {NavbarComponent} from "./shared/component/navbar/navbar.component";
import {SidebarComponent} from "./shared/component/sidebar/sidebar.component";
import {FooterComponent} from "./shared/component/footer/footer.component";
import {SearchComponent} from "./pages/search/search.component";
import {NgMultiSelectDropDownModule} from "ng-multiselect-dropdown";
import {CardResultsComponent} from './shared/component/card-results/card-results.component';
import {NgxPaginationModule} from "ngx-pagination";
import {CardComponent} from './shared/component/card/card.component';
import {GoogleLoginProvider, SocialAuthServiceConfig, SocialLoginModule} from "@abacritt/angularx-social-login";
import {DeckBuilderComponent} from "./pages/deck-builder/deck-builder.component";
import {SearchFilterComponent} from './shared/component/search-filter/search-filter.component';
import {DeckVisualisationComponent} from './shared/component/deck-visualisation/deck-visualisation.component';
import {MatTabsModule} from "@angular/material/tabs";
import {DeckStatistiquesComponent} from './shared/component/deck-statistiques/deck-statistiques.component';
import {BrowserModule} from "@angular/platform-browser";
import {NgxTabsModule} from "@ngx-lite/tabs";
import {DeckCostBarChartComponent} from './shared/component/deck-cost-bar-chart/deck-cost-bar-chart.component';
import {BarChartModule, PieChartModule} from "@swimlane/ngx-charts";
import {DeckTypePieChartComponent} from './shared/component/deck-type-pie-chart/deck-type-pie-chart.component';
import {DeckPowerBarChartComponent} from "./shared/component/deck-power-bar-chart/deck-power-bar-chart.component";
import {HandShufflerComponent} from './shared/component/hand-shuffler/hand-shuffler.component';
import {HttpAcceptLanguageInterceptor} from "./shared/service/http-accept-language-interceptor.service";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {SaveDeckComponent} from './shared/component/save-deck/save-deck.component';
import {MarkdownModule, MarkedOptions, MarkedRenderer} from "ngx-markdown";
import {MyDecksComponent} from './pages/my-decks/my-decks.component';
import {DeckPreviewComponent} from './shared/component/deck-preview/deck-preview.component';
import {DeckDetailsComponent} from './pages/deck-details/deck-details.component';
import {CardModalComponent} from "./shared/component/card-modal/card-modal.component";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {MatSelectModule} from "@angular/material/select";
import {environment} from "../environments/environment";
import { DeckResultsComponent } from './shared/component/deck-results/deck-results.component';
import { DecksSearchComponent } from './pages/decks-search/decks-search.component';
import {HttpErrorInterceptorService} from "./shared/service/http-error-interceptor.service";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {TabViewModule} from "primeng/tabview";

export function httpTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http);
}

export function markedOptionsFactory(): MarkedOptions {
    const renderer = new MarkedRenderer();

    renderer.link = (href: string, title: string, text: string) => {
        return `${text}`;
    };

    return {
        renderer: renderer
    };
}

@NgModule({
    imports: [
        MarkdownModule.forRoot({
            loader: HttpClient,
            markedOptions: {
                provide: MarkedOptions,
                useFactory: markedOptionsFactory,
            },
        }),
        BrowserAnimationsModule,
        FormsModule,
        RouterModule,
        MatInputModule,
        MatButtonModule,
        HttpClientModule,
        MarkdownModule.forRoot(),
        AppRoutingModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: httpTranslateLoader,
                deps: [HttpClient]
            }
        }),
        NgMultiSelectDropDownModule,
        ReactiveFormsModule,
        NgxPaginationModule,
        SocialLoginModule,
        MatTabsModule,
        BrowserModule,
        NgxTabsModule,
        BarChartModule,
        PieChartModule,
        MatExpansionModule,
        MatSidenavModule,
        MatSlideToggleModule,
        NgbModule,
        MatSelectModule,
        MatCheckboxModule,
        TabViewModule
    ],
    declarations: [
        AppComponent,
        NavbarComponent,
        SidebarComponent,
        FooterComponent,
        SearchComponent,
        CardResultsComponent,
        CardComponent,
        DeckBuilderComponent,
        SearchFilterComponent,
        DeckVisualisationComponent,
        DeckStatistiquesComponent,
        DeckCostBarChartComponent,
        DeckTypePieChartComponent,
        DeckPowerBarChartComponent,
        HandShufflerComponent,
        SaveDeckComponent,
        MyDecksComponent,
        DeckPreviewComponent,
        DeckDetailsComponent,
        CardModalComponent,
        DeckResultsComponent,
        DecksSearchComponent
    ],
    providers: [{
        provide: 'SocialAuthServiceConfig',
        useValue: {
            autoLogin: true, //keeps the user signed in
            providers: [
                {
                    id: GoogleLoginProvider.PROVIDER_ID,
                    provider: new GoogleLoginProvider(environment.clientId) // your client id
                }
            ],
            onError: (err) => {
                console.error(err);
            }
        } as SocialAuthServiceConfig
    },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpAcceptLanguageInterceptor,
            multi: true,
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpErrorInterceptorService,
            multi: true,
        }

    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
