import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Subscription} from "rxjs";
import {ColorService} from "../../shared/service/color.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {LanguageService} from "../../shared/service/language.service";
import {TranslateService} from "@ngx-translate/core";
import {TagService} from "../../shared/service/tag.service";
import {TypeService} from "../../shared/service/type.service";
import {CardService} from "../../shared/service/card.service";
import {TypeEnum} from "../../shared/model/constant/TypeEnum";
import {SearchFilterComponent} from "../../shared/component/search-filter/search-filter.component";

const FILTER_PAG_REGEX = /[^0-9]/g;

@Component({
    selector: 'opdb-deck-builder',
    templateUrl: './deck-builder.component.html',
    styleUrls: ['./deck-builder.component.css']
})
export class DeckBuilderComponent implements OnInit, OnDestroy {

    @ViewChild(SearchFilterComponent) filtersComponent: SearchFilterComponent;
    private subscriptions: Subscription[] = [];
    public searchResult: Page<Deck>;
    public searchForm: any;
    public deckIsNotValid: boolean = false;
    public deck: Deck;

    constructor(private _colorService: ColorService, private fb: FormBuilder, private _languageService: LanguageService,
                private _translateService: TranslateService, private _tagService: TagService,
                private _typeService: TypeService, private _cardService: CardService) {
    }

    ngOnInit() {
        if (sessionStorage.getItem('deck') && JSON.parse(sessionStorage.getItem('mapCount'))) {
            this.deck = JSON.parse(sessionStorage.getItem('deck'))
        } else {
            this.deck = {id: null, leader: null, cards: []}
        }

        this.searchForm = this.fb.group({
            colors: [],
            tags: [],
            types: []
        });
        this.launchSearch(0);
    }

    launchSearch(numberPage) {
        this.subscriptions.push(
            this._cardService.search(this.searchForm.value, numberPage, 15).subscribe(result => {
                this.searchResult = result;
                document.getElementById("top")?.scrollIntoView();
            })
        );
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach(subscription => subscription.unsubscribe());
    }

    changePage(newPage: number) {
        this.launchSearch(newPage - 1);
    }


    formSubmitted($event: any) {
        if ($event == null) {
            this.filtersComponent.searchForm.reset()
            this.filtersComponent.validForm();
        } else {
            this.searchForm = {...$event};
        }
        this.launchSearch(0);
    }


    addCardToDeck(cardSelected: Card) {
        if (cardSelected.type.id === TypeEnum.LEADER) {
            this.deck.leader = {...cardSelected};
            this.filtersComponent.searchForm.patchValue({colors: cardSelected.colors})
            this.filtersComponent.validForm();
        } else {
            this.deck.cards.push({...cardSelected});
            sessionStorage.setItem('deck', JSON.stringify(this.deck));
        }
    }

    eraseDeck() {
        sessionStorage.removeItem('deck');
        this.deck = {id: null, leader: null, cards: []};
    }


}
