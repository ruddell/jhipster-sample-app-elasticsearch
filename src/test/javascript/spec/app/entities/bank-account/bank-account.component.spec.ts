/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';

import { JhipsterElasticsearchSampleApplicationTestModule } from '../../../test.module';
import { BankAccountComponent } from '../../../../../../main/webapp/app/entities/bank-account/bank-account.component';
import { BankAccountService } from '../../../../../../main/webapp/app/entities/bank-account/bank-account.service';
import { BankAccount } from '../../../../../../main/webapp/app/entities/bank-account/bank-account.model';

describe('Component Tests', () => {

    describe('BankAccount Management Component', () => {
        let comp: BankAccountComponent;
        let fixture: ComponentFixture<BankAccountComponent>;
        let service: BankAccountService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterElasticsearchSampleApplicationTestModule],
                declarations: [BankAccountComponent],
                providers: [
                    BankAccountService
                ]
            })
            .overrideTemplate(BankAccountComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(BankAccountComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BankAccountService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new BankAccount(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.bankAccounts[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
