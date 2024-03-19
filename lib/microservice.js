"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SwnMicroservices = void 0;
const aws_lambda_1 = require("aws-cdk-lib/aws-lambda");
const aws_lambda_nodejs_1 = require("aws-cdk-lib/aws-lambda-nodejs");
const constructs_1 = require("constructs");
const path_1 = require("path");
class SwnMicroservices extends constructs_1.Construct {
    constructor(scope, id, props) {
        super(scope, id);
        // product microservices
        this.productMicroservice = this.createProductFunction(props.productTable);
        // basket microservices
        this.basketMicroservice = this.createBasketFunction(props.basketTable);
        // ordering Microservice
        this.orderingMicroservice = this.createOrderingFunction(props.orderTable);
    }
    createProductFunction(productTable) {
        const nodeJsFunctionProps = {
            bundling: {
                externalModules: [
                    'aws-sdk'
                ]
            },
            environment: {
                PRIMARY_KEY: 'id',
                DYNAMODB_TABLE_NAME: productTable.tableName
            },
            runtime: aws_lambda_1.Runtime.NODEJS_18_X
        };
        // Product microservices lambda function
        const productFunction = new aws_lambda_nodejs_1.NodejsFunction(this, 'productLambdaFunction', {
            entry: (0, path_1.join)(__dirname, `/../src/product/index.js`),
            ...nodeJsFunctionProps,
        });
        productTable.grantReadWriteData(productFunction);
        return productFunction;
    }
    createBasketFunction(basketTable) {
        const basketFunctionProps = {
            bundling: {
                externalModules: [
                    'aws-sdk', // Use the 'aws-sdk' available in the Lambda runtime
                ],
            },
            environment: {
                PRIMARY_KEY: 'userName',
                DYNAMODB_TABLE_NAME: basketTable.tableName,
                EVENT_SOURCE: "com.swn.basket.checkoutbasket",
                EVENT_DETAILTYPE: "CheckoutBasket",
                EVENT_BUSNAME: "SwnEventBus"
            },
            runtime: aws_lambda_1.Runtime.NODEJS_18_X,
        };
        const basketFunction = new aws_lambda_nodejs_1.NodejsFunction(this, 'basketLambdaFunction', {
            entry: (0, path_1.join)(__dirname, `/../src/basket/index.js`),
            ...basketFunctionProps,
        });
        basketTable.grantReadWriteData(basketFunction);
        return basketFunction;
    }
    createOrderingFunction(orderTable) {
        const nodeJsFunctionProps = {
            bundling: {
                externalModules: [
                    'aws-sdk', // Use the 'aws-sdk' available in the Lambda runtime
                ],
            },
            environment: {
                PRIMARY_KEY: 'userName',
                SORT_KEY: 'orderDate',
                DYNAMODB_TABLE_NAME: orderTable.tableName,
            },
            runtime: aws_lambda_1.Runtime.NODEJS_18_X,
        };
        const orderFunction = new aws_lambda_nodejs_1.NodejsFunction(this, 'orderingLambdaFunction', {
            entry: (0, path_1.join)(__dirname, `/../src/ordering/index.js`),
            ...nodeJsFunctionProps,
        });
        orderTable.grantReadWriteData(orderFunction);
        return orderFunction;
    }
}
exports.SwnMicroservices = SwnMicroservices;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWljcm9zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibWljcm9zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUNBLHVEQUFpRDtBQUNqRCxxRUFBb0Y7QUFDcEYsMkNBQXVDO0FBQ3ZDLCtCQUE0QjtBQVE1QixNQUFhLGdCQUFpQixTQUFRLHNCQUFTO0lBTTdDLFlBQVksS0FBZ0IsRUFBRSxFQUFVLEVBQUUsS0FBNEI7UUFDcEUsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQztRQUVqQix3QkFBd0I7UUFDeEIsSUFBSSxDQUFDLG1CQUFtQixHQUFHLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDMUUsdUJBQXVCO1FBQ3ZCLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLENBQUMsb0JBQW9CLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ3ZFLHdCQUF3QjtRQUN4QixJQUFJLENBQUMsb0JBQW9CLEdBQUcsSUFBSSxDQUFDLHNCQUFzQixDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUM1RSxDQUFDO0lBRU8scUJBQXFCLENBQUMsWUFBb0I7UUFDaEQsTUFBTSxtQkFBbUIsR0FBd0I7WUFDL0MsUUFBUSxFQUFFO2dCQUNSLGVBQWUsRUFBRTtvQkFDZixTQUFTO2lCQUNWO2FBQ0Y7WUFDRCxXQUFXLEVBQUU7Z0JBQ1gsV0FBVyxFQUFFLElBQUk7Z0JBQ2pCLG1CQUFtQixFQUFFLFlBQVksQ0FBQyxTQUFTO2FBQzVDO1lBQ0QsT0FBTyxFQUFFLG9CQUFPLENBQUMsV0FBVztTQUM3QixDQUFBO1FBRUQsd0NBQXdDO1FBQ3hDLE1BQU0sZUFBZSxHQUFHLElBQUksa0NBQWMsQ0FBQyxJQUFJLEVBQUUsdUJBQXVCLEVBQUU7WUFDeEUsS0FBSyxFQUFFLElBQUEsV0FBSSxFQUFDLFNBQVMsRUFBRSwwQkFBMEIsQ0FBQztZQUNsRCxHQUFHLG1CQUFtQjtTQUN2QixDQUFDLENBQUM7UUFFSCxZQUFZLENBQUMsa0JBQWtCLENBQUMsZUFBZSxDQUFDLENBQUM7UUFFakQsT0FBTyxlQUFlLENBQUM7SUFDekIsQ0FBQztJQUVPLG9CQUFvQixDQUFDLFdBQW1CO1FBQzlDLE1BQU0sbUJBQW1CLEdBQXdCO1lBQy9DLFFBQVEsRUFBRTtnQkFDTixlQUFlLEVBQUU7b0JBQ2IsU0FBUyxFQUFFLG9EQUFvRDtpQkFDbEU7YUFDSjtZQUNELFdBQVcsRUFBRTtnQkFDVCxXQUFXLEVBQUUsVUFBVTtnQkFDdkIsbUJBQW1CLEVBQUUsV0FBVyxDQUFDLFNBQVM7Z0JBQzFDLFlBQVksRUFBRSwrQkFBK0I7Z0JBQzdDLGdCQUFnQixFQUFFLGdCQUFnQjtnQkFDbEMsYUFBYSxFQUFFLGFBQWE7YUFDL0I7WUFDRCxPQUFPLEVBQUUsb0JBQU8sQ0FBQyxXQUFXO1NBQzdCLENBQUE7UUFFRCxNQUFNLGNBQWMsR0FBRyxJQUFJLGtDQUFjLENBQUMsSUFBSSxFQUFFLHNCQUFzQixFQUFFO1lBQ3RFLEtBQUssRUFBRSxJQUFBLFdBQUksRUFBQyxTQUFTLEVBQUUseUJBQXlCLENBQUM7WUFDakQsR0FBRyxtQkFBbUI7U0FDdkIsQ0FBQyxDQUFDO1FBRUgsV0FBVyxDQUFDLGtCQUFrQixDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQy9DLE9BQU8sY0FBYyxDQUFDO0lBQ3hCLENBQUM7SUFFTyxzQkFBc0IsQ0FBQyxVQUFrQjtRQUMvQyxNQUFNLG1CQUFtQixHQUF3QjtZQUM3QyxRQUFRLEVBQUU7Z0JBQ04sZUFBZSxFQUFFO29CQUNiLFNBQVMsRUFBRSxvREFBb0Q7aUJBQ2xFO2FBQ0o7WUFDRCxXQUFXLEVBQUU7Z0JBQ1QsV0FBVyxFQUFFLFVBQVU7Z0JBQ3ZCLFFBQVEsRUFBRSxXQUFXO2dCQUNyQixtQkFBbUIsRUFBRSxVQUFVLENBQUMsU0FBUzthQUM1QztZQUNELE9BQU8sRUFBRSxvQkFBTyxDQUFDLFdBQVc7U0FDL0IsQ0FBQTtRQUVELE1BQU0sYUFBYSxHQUFHLElBQUksa0NBQWMsQ0FBQyxJQUFJLEVBQUUsd0JBQXdCLEVBQUU7WUFDckUsS0FBSyxFQUFFLElBQUEsV0FBSSxFQUFDLFNBQVMsRUFBRSwyQkFBMkIsQ0FBQztZQUNuRCxHQUFHLG1CQUFtQjtTQUN6QixDQUFDLENBQUM7UUFFSCxVQUFVLENBQUMsa0JBQWtCLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDN0MsT0FBTyxhQUFhLENBQUM7SUFDdkIsQ0FBQztDQUVGO0FBNUZELDRDQTRGQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElUYWJsZSB9IGZyb20gXCJhd3MtY2RrLWxpYi9hd3MtZHluYW1vZGJcIjtcclxuaW1wb3J0IHsgUnVudGltZSB9IGZyb20gXCJhd3MtY2RrLWxpYi9hd3MtbGFtYmRhXCI7XHJcbmltcG9ydCB7IE5vZGVqc0Z1bmN0aW9uLCBOb2RlanNGdW5jdGlvblByb3BzIH0gZnJvbSBcImF3cy1jZGstbGliL2F3cy1sYW1iZGEtbm9kZWpzXCI7XHJcbmltcG9ydCB7IENvbnN0cnVjdCB9IGZyb20gXCJjb25zdHJ1Y3RzXCI7XHJcbmltcG9ydCB7IGpvaW4gfSBmcm9tIFwicGF0aFwiO1xyXG5cclxuaW50ZXJmYWNlIFN3bk1pY3Jvc2VydmljZXNQcm9wcyB7XHJcbiAgICBwcm9kdWN0VGFibGU6IElUYWJsZTtcclxuICAgIGJhc2tldFRhYmxlOiBJVGFibGU7XHJcbiAgICBvcmRlclRhYmxlOiBJVGFibGU7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBTd25NaWNyb3NlcnZpY2VzIGV4dGVuZHMgQ29uc3RydWN0IHtcclxuXHJcbiAgcHVibGljIHJlYWRvbmx5IHByb2R1Y3RNaWNyb3NlcnZpY2U6IE5vZGVqc0Z1bmN0aW9uO1xyXG4gIHB1YmxpYyByZWFkb25seSBiYXNrZXRNaWNyb3NlcnZpY2U6IE5vZGVqc0Z1bmN0aW9uO1xyXG4gIHB1YmxpYyByZWFkb25seSBvcmRlcmluZ01pY3Jvc2VydmljZTogTm9kZWpzRnVuY3Rpb247XHJcblxyXG4gIGNvbnN0cnVjdG9yKHNjb3BlOiBDb25zdHJ1Y3QsIGlkOiBzdHJpbmcsIHByb3BzOiBTd25NaWNyb3NlcnZpY2VzUHJvcHMpIHtcclxuICAgIHN1cGVyKHNjb3BlLCBpZCk7XHJcblxyXG4gICAgLy8gcHJvZHVjdCBtaWNyb3NlcnZpY2VzXHJcbiAgICB0aGlzLnByb2R1Y3RNaWNyb3NlcnZpY2UgPSB0aGlzLmNyZWF0ZVByb2R1Y3RGdW5jdGlvbihwcm9wcy5wcm9kdWN0VGFibGUpO1xyXG4gICAgLy8gYmFza2V0IG1pY3Jvc2VydmljZXNcclxuICAgIHRoaXMuYmFza2V0TWljcm9zZXJ2aWNlID0gdGhpcy5jcmVhdGVCYXNrZXRGdW5jdGlvbihwcm9wcy5iYXNrZXRUYWJsZSk7XHJcbiAgICAvLyBvcmRlcmluZyBNaWNyb3NlcnZpY2VcclxuICAgIHRoaXMub3JkZXJpbmdNaWNyb3NlcnZpY2UgPSB0aGlzLmNyZWF0ZU9yZGVyaW5nRnVuY3Rpb24ocHJvcHMub3JkZXJUYWJsZSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGNyZWF0ZVByb2R1Y3RGdW5jdGlvbihwcm9kdWN0VGFibGU6IElUYWJsZSkgOiBOb2RlanNGdW5jdGlvbiB7XHJcbiAgICBjb25zdCBub2RlSnNGdW5jdGlvblByb3BzOiBOb2RlanNGdW5jdGlvblByb3BzID0ge1xyXG4gICAgICBidW5kbGluZzoge1xyXG4gICAgICAgIGV4dGVybmFsTW9kdWxlczogW1xyXG4gICAgICAgICAgJ2F3cy1zZGsnXHJcbiAgICAgICAgXVxyXG4gICAgICB9LFxyXG4gICAgICBlbnZpcm9ubWVudDoge1xyXG4gICAgICAgIFBSSU1BUllfS0VZOiAnaWQnLFxyXG4gICAgICAgIERZTkFNT0RCX1RBQkxFX05BTUU6IHByb2R1Y3RUYWJsZS50YWJsZU5hbWVcclxuICAgICAgfSxcclxuICAgICAgcnVudGltZTogUnVudGltZS5OT0RFSlNfMThfWFxyXG4gICAgfVxyXG5cclxuICAgIC8vIFByb2R1Y3QgbWljcm9zZXJ2aWNlcyBsYW1iZGEgZnVuY3Rpb25cclxuICAgIGNvbnN0IHByb2R1Y3RGdW5jdGlvbiA9IG5ldyBOb2RlanNGdW5jdGlvbih0aGlzLCAncHJvZHVjdExhbWJkYUZ1bmN0aW9uJywge1xyXG4gICAgICBlbnRyeTogam9pbihfX2Rpcm5hbWUsIGAvLi4vc3JjL3Byb2R1Y3QvaW5kZXguanNgKSxcclxuICAgICAgLi4ubm9kZUpzRnVuY3Rpb25Qcm9wcyxcclxuICAgIH0pO1xyXG5cclxuICAgIHByb2R1Y3RUYWJsZS5ncmFudFJlYWRXcml0ZURhdGEocHJvZHVjdEZ1bmN0aW9uKTsgXHJcbiAgICBcclxuICAgIHJldHVybiBwcm9kdWN0RnVuY3Rpb247XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGNyZWF0ZUJhc2tldEZ1bmN0aW9uKGJhc2tldFRhYmxlOiBJVGFibGUpIDogTm9kZWpzRnVuY3Rpb24ge1xyXG4gICAgY29uc3QgYmFza2V0RnVuY3Rpb25Qcm9wczogTm9kZWpzRnVuY3Rpb25Qcm9wcyA9IHtcclxuICAgICAgYnVuZGxpbmc6IHtcclxuICAgICAgICAgIGV4dGVybmFsTW9kdWxlczogW1xyXG4gICAgICAgICAgICAgICdhd3Mtc2RrJywgLy8gVXNlIHRoZSAnYXdzLXNkaycgYXZhaWxhYmxlIGluIHRoZSBMYW1iZGEgcnVudGltZVxyXG4gICAgICAgICAgXSxcclxuICAgICAgfSxcclxuICAgICAgZW52aXJvbm1lbnQ6IHtcclxuICAgICAgICAgIFBSSU1BUllfS0VZOiAndXNlck5hbWUnLFxyXG4gICAgICAgICAgRFlOQU1PREJfVEFCTEVfTkFNRTogYmFza2V0VGFibGUudGFibGVOYW1lLFxyXG4gICAgICAgICAgRVZFTlRfU09VUkNFOiBcImNvbS5zd24uYmFza2V0LmNoZWNrb3V0YmFza2V0XCIsXHJcbiAgICAgICAgICBFVkVOVF9ERVRBSUxUWVBFOiBcIkNoZWNrb3V0QmFza2V0XCIsXHJcbiAgICAgICAgICBFVkVOVF9CVVNOQU1FOiBcIlN3bkV2ZW50QnVzXCJcclxuICAgICAgfSxcclxuICAgICAgcnVudGltZTogUnVudGltZS5OT0RFSlNfMThfWCxcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBiYXNrZXRGdW5jdGlvbiA9IG5ldyBOb2RlanNGdW5jdGlvbih0aGlzLCAnYmFza2V0TGFtYmRhRnVuY3Rpb24nLCB7XHJcbiAgICAgIGVudHJ5OiBqb2luKF9fZGlybmFtZSwgYC8uLi9zcmMvYmFza2V0L2luZGV4LmpzYCksXHJcbiAgICAgIC4uLmJhc2tldEZ1bmN0aW9uUHJvcHMsXHJcbiAgICB9KTtcclxuXHJcbiAgICBiYXNrZXRUYWJsZS5ncmFudFJlYWRXcml0ZURhdGEoYmFza2V0RnVuY3Rpb24pO1xyXG4gICAgcmV0dXJuIGJhc2tldEZ1bmN0aW9uO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBjcmVhdGVPcmRlcmluZ0Z1bmN0aW9uKG9yZGVyVGFibGU6IElUYWJsZSkgOiBOb2RlanNGdW5jdGlvbiB7XHJcbiAgICBjb25zdCBub2RlSnNGdW5jdGlvblByb3BzOiBOb2RlanNGdW5jdGlvblByb3BzID0ge1xyXG4gICAgICAgIGJ1bmRsaW5nOiB7XHJcbiAgICAgICAgICAgIGV4dGVybmFsTW9kdWxlczogW1xyXG4gICAgICAgICAgICAgICAgJ2F3cy1zZGsnLCAvLyBVc2UgdGhlICdhd3Mtc2RrJyBhdmFpbGFibGUgaW4gdGhlIExhbWJkYSBydW50aW1lXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgfSwgICAgICBcclxuICAgICAgICBlbnZpcm9ubWVudDoge1xyXG4gICAgICAgICAgICBQUklNQVJZX0tFWTogJ3VzZXJOYW1lJyxcclxuICAgICAgICAgICAgU09SVF9LRVk6ICdvcmRlckRhdGUnLFxyXG4gICAgICAgICAgICBEWU5BTU9EQl9UQUJMRV9OQU1FOiBvcmRlclRhYmxlLnRhYmxlTmFtZSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIHJ1bnRpbWU6IFJ1bnRpbWUuTk9ERUpTXzE4X1gsXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3Qgb3JkZXJGdW5jdGlvbiA9IG5ldyBOb2RlanNGdW5jdGlvbih0aGlzLCAnb3JkZXJpbmdMYW1iZGFGdW5jdGlvbicsIHtcclxuICAgICAgICBlbnRyeTogam9pbihfX2Rpcm5hbWUsIGAvLi4vc3JjL29yZGVyaW5nL2luZGV4LmpzYCksXHJcbiAgICAgICAgLi4ubm9kZUpzRnVuY3Rpb25Qcm9wcyxcclxuICAgIH0pO1xyXG5cclxuICAgIG9yZGVyVGFibGUuZ3JhbnRSZWFkV3JpdGVEYXRhKG9yZGVyRnVuY3Rpb24pO1xyXG4gICAgcmV0dXJuIG9yZGVyRnVuY3Rpb247XHJcbiAgfVxyXG5cclxufSJdfQ==