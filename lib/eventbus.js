"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SwnEventBus = void 0;
const aws_events_1 = require("aws-cdk-lib/aws-events");
const aws_events_targets_1 = require("aws-cdk-lib/aws-events-targets");
const constructs_1 = require("constructs");
class SwnEventBus extends constructs_1.Construct {
    constructor(scope, id, props) {
        super(scope, id);
        //eventbus
        const bus = new aws_events_1.EventBus(this, 'SwnEventBus', {
            eventBusName: 'SwnEventBus'
        });
        const checkoutBasketRule = new aws_events_1.Rule(this, 'CheckoutBasketRule', {
            eventBus: bus,
            enabled: true,
            description: 'When Basket microservice checkout the basket',
            eventPattern: {
                source: ['com.swn.basket.checkoutbasket'],
                detailType: ['CheckoutBasket']
            },
            ruleName: 'CheckoutBasketRule'
        });
        // // need to pass target to Ordering Lambda service
        // checkoutBasketRule.addTarget(new LambdaFunction(props.targetFuntion)); 
        // need to pass target to Ordering Lambda service
        checkoutBasketRule.addTarget(new aws_events_targets_1.SqsQueue(props.targetQueue));
        bus.grantPutEventsTo(props.publisherFuntion);
        // AccessDeniedException - is not authorized to perform: events:PutEvents
    }
}
exports.SwnEventBus = SwnEventBus;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZlbnRidXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJldmVudGJ1cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSx1REFBd0Q7QUFDeEQsdUVBQTBEO0FBRzFELDJDQUF1QztBQU92QyxNQUFhLFdBQVksU0FBUSxzQkFBUztJQUV0QyxZQUFZLEtBQWdCLEVBQUUsRUFBVSxFQUFFLEtBQXVCO1FBQzdELEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFFakIsVUFBVTtRQUNWLE1BQU0sR0FBRyxHQUFHLElBQUkscUJBQVEsQ0FBQyxJQUFJLEVBQUUsYUFBYSxFQUFFO1lBQzFDLFlBQVksRUFBRSxhQUFhO1NBQzlCLENBQUMsQ0FBQztRQUVILE1BQU0sa0JBQWtCLEdBQUcsSUFBSSxpQkFBSSxDQUFDLElBQUksRUFBRSxvQkFBb0IsRUFBRTtZQUM1RCxRQUFRLEVBQUUsR0FBRztZQUNiLE9BQU8sRUFBRSxJQUFJO1lBQ2IsV0FBVyxFQUFFLDhDQUE4QztZQUMzRCxZQUFZLEVBQUU7Z0JBQ1YsTUFBTSxFQUFFLENBQUMsK0JBQStCLENBQUM7Z0JBQ3pDLFVBQVUsRUFBRSxDQUFDLGdCQUFnQixDQUFDO2FBQ2pDO1lBQ0QsUUFBUSxFQUFFLG9CQUFvQjtTQUNqQyxDQUFDLENBQUM7UUFFSCxvREFBb0Q7UUFDcEQsMEVBQTBFO1FBRTFFLGlEQUFpRDtRQUNqRCxrQkFBa0IsQ0FBQyxTQUFTLENBQUMsSUFBSSw2QkFBUSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO1FBRTlELEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUN6Qyx5RUFBeUU7SUFFakYsQ0FBQztDQUVKO0FBaENELGtDQWdDQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEV2ZW50QnVzLCBSdWxlIH0gZnJvbSBcImF3cy1jZGstbGliL2F3cy1ldmVudHNcIjtcclxuaW1wb3J0IHsgU3FzUXVldWUgfSBmcm9tIFwiYXdzLWNkay1saWIvYXdzLWV2ZW50cy10YXJnZXRzXCI7XHJcbmltcG9ydCB7IElGdW5jdGlvbiB9IGZyb20gXCJhd3MtY2RrLWxpYi9hd3MtbGFtYmRhXCI7XHJcbmltcG9ydCB7IElRdWV1ZSB9IGZyb20gXCJhd3MtY2RrLWxpYi9hd3Mtc3FzXCI7XHJcbmltcG9ydCB7IENvbnN0cnVjdCB9IGZyb20gXCJjb25zdHJ1Y3RzXCI7XHJcblxyXG5pbnRlcmZhY2UgU3duRXZlbnRCdXNQcm9wcyB7XHJcbiAgICBwdWJsaXNoZXJGdW50aW9uOiBJRnVuY3Rpb247XHJcbiAgICB0YXJnZXRRdWV1ZTogSVF1ZXVlO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgU3duRXZlbnRCdXMgZXh0ZW5kcyBDb25zdHJ1Y3Qge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHNjb3BlOiBDb25zdHJ1Y3QsIGlkOiBzdHJpbmcsIHByb3BzOiBTd25FdmVudEJ1c1Byb3BzKSB7XHJcbiAgICAgICAgc3VwZXIoc2NvcGUsIGlkKTtcclxuXHJcbiAgICAgICAgLy9ldmVudGJ1c1xyXG4gICAgICAgIGNvbnN0IGJ1cyA9IG5ldyBFdmVudEJ1cyh0aGlzLCAnU3duRXZlbnRCdXMnLCB7XHJcbiAgICAgICAgICAgIGV2ZW50QnVzTmFtZTogJ1N3bkV2ZW50QnVzJ1xyXG4gICAgICAgIH0pO1xyXG4gICAgXHJcbiAgICAgICAgY29uc3QgY2hlY2tvdXRCYXNrZXRSdWxlID0gbmV3IFJ1bGUodGhpcywgJ0NoZWNrb3V0QmFza2V0UnVsZScsIHtcclxuICAgICAgICAgICAgZXZlbnRCdXM6IGJ1cyxcclxuICAgICAgICAgICAgZW5hYmxlZDogdHJ1ZSxcclxuICAgICAgICAgICAgZGVzY3JpcHRpb246ICdXaGVuIEJhc2tldCBtaWNyb3NlcnZpY2UgY2hlY2tvdXQgdGhlIGJhc2tldCcsXHJcbiAgICAgICAgICAgIGV2ZW50UGF0dGVybjoge1xyXG4gICAgICAgICAgICAgICAgc291cmNlOiBbJ2NvbS5zd24uYmFza2V0LmNoZWNrb3V0YmFza2V0J10sXHJcbiAgICAgICAgICAgICAgICBkZXRhaWxUeXBlOiBbJ0NoZWNrb3V0QmFza2V0J11cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgcnVsZU5hbWU6ICdDaGVja291dEJhc2tldFJ1bGUnXHJcbiAgICAgICAgfSk7XHJcbiAgICBcclxuICAgICAgICAvLyAvLyBuZWVkIHRvIHBhc3MgdGFyZ2V0IHRvIE9yZGVyaW5nIExhbWJkYSBzZXJ2aWNlXHJcbiAgICAgICAgLy8gY2hlY2tvdXRCYXNrZXRSdWxlLmFkZFRhcmdldChuZXcgTGFtYmRhRnVuY3Rpb24ocHJvcHMudGFyZ2V0RnVudGlvbikpOyBcclxuXHJcbiAgICAgICAgLy8gbmVlZCB0byBwYXNzIHRhcmdldCB0byBPcmRlcmluZyBMYW1iZGEgc2VydmljZVxyXG4gICAgICAgIGNoZWNrb3V0QmFza2V0UnVsZS5hZGRUYXJnZXQobmV3IFNxc1F1ZXVlKHByb3BzLnRhcmdldFF1ZXVlKSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgYnVzLmdyYW50UHV0RXZlbnRzVG8ocHJvcHMucHVibGlzaGVyRnVudGlvbik7XHJcbiAgICAgICAgICAgIC8vIEFjY2Vzc0RlbmllZEV4Y2VwdGlvbiAtIGlzIG5vdCBhdXRob3JpemVkIHRvIHBlcmZvcm06IGV2ZW50czpQdXRFdmVudHNcclxuXHJcbiAgICB9XHJcblxyXG59Il19