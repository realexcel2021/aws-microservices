"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SwnApiGateway = void 0;
const aws_apigateway_1 = require("aws-cdk-lib/aws-apigateway");
const constructs_1 = require("constructs");
class SwnApiGateway extends constructs_1.Construct {
    constructor(scope, id, props) {
        super(scope, id);
        // Product api gateway
        this.createProductApi(props.productMicroservice);
        // Basket api gateway
        this.createBasketApi(props.basketMicroservice);
        // Ordering api gateway
        this.createOrderApi(props.orderingMicroservices);
    }
    createProductApi(productMicroservice) {
        // Product microservices api gateway
        // root name = product
        // GET /product
        // POST /product
        // Single product with id parameter
        // GET /product/{id}
        // PUT /product/{id}
        // DELETE /product/{id}
        const apigw = new aws_apigateway_1.LambdaRestApi(this, 'productApi', {
            restApiName: 'Product Service',
            handler: productMicroservice,
            proxy: false
        });
        const product = apigw.root.addResource('product');
        product.addMethod('GET'); // GET /product
        product.addMethod('POST'); // POST /product
        const singleProduct = product.addResource('{id}'); // product/{id}
        singleProduct.addMethod('GET'); // GET /product/{id}
        singleProduct.addMethod('PUT'); // PUT /product/{id}
        singleProduct.addMethod('DELETE'); // DELETE /product/{id}
    }
    createBasketApi(basketMicroservice) {
        // Basket microservices api gateway
        // root name = basket
        // GET /basket
        // POST /basket
        // // Single basket with userName parameter - resource name = basket/{userName}
        // GET /basket/{userName}
        // DELETE /basket/{userName}
        // checkout basket async flow
        // POST /basket/checkout
        const apigw = new aws_apigateway_1.LambdaRestApi(this, 'basketApi', {
            restApiName: 'Basket Service',
            handler: basketMicroservice,
            proxy: false
        });
        const basket = apigw.root.addResource('basket');
        basket.addMethod('GET'); // GET /basket
        basket.addMethod('POST'); // POST /basket
        const singleBasket = basket.addResource('{userName}');
        singleBasket.addMethod('GET'); // GET /basket/{userName}
        singleBasket.addMethod('DELETE'); // DELETE /basket/{userName}
        const basketCheckout = basket.addResource('checkout');
        basketCheckout.addMethod('POST'); // POST /basket/checkout
        // expected request payload : { userName : swn }
    }
    createOrderApi(orderingMicroservices) {
        // Ordering microservices api gateway
        // root name = order
        // GET /order
        // GET /order/{userName}
        // expected request : xxx/order/swn?orderDate=timestamp
        // ordering ms grap input and query parameters and filter to dynamo db
        const apigw = new aws_apigateway_1.LambdaRestApi(this, 'orderApi', {
            restApiName: 'Order Service',
            handler: orderingMicroservices,
            proxy: false
        });
        const order = apigw.root.addResource('order');
        order.addMethod('GET'); // GET /order        
        const singleOrder = order.addResource('{userName}');
        singleOrder.addMethod('GET'); // GET /order/{userName}
        // expected request : xxx/order/swn?orderDate=timestamp
        // ordering ms grap input and query parameters and filter to dynamo db
        return singleOrder;
    }
}
exports.SwnApiGateway = SwnApiGateway;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBpZ2F0ZXdheS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwaWdhdGV3YXkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsK0RBQTJEO0FBRTNELDJDQUF1QztBQVF2QyxNQUFhLGFBQWMsU0FBUSxzQkFBUztJQUV4QyxZQUFZLEtBQWdCLEVBQUUsRUFBVSxFQUFFLEtBQXlCO1FBQy9ELEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFFakIsc0JBQXNCO1FBQ3RCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsbUJBQW1CLENBQUMsQ0FBQztRQUNqRCxxQkFBcUI7UUFDckIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsa0JBQWtCLENBQUMsQ0FBQztRQUMvQyx1QkFBdUI7UUFDdkIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMscUJBQXFCLENBQUMsQ0FBQztJQUNyRCxDQUFDO0lBRU8sZ0JBQWdCLENBQUMsbUJBQThCO1FBQ3JELG9DQUFvQztRQUNwQyxzQkFBc0I7UUFFdEIsZUFBZTtRQUNmLGdCQUFnQjtRQUVoQixtQ0FBbUM7UUFDbkMsb0JBQW9CO1FBQ3BCLG9CQUFvQjtRQUNwQix1QkFBdUI7UUFFdkIsTUFBTSxLQUFLLEdBQUcsSUFBSSw4QkFBYSxDQUFDLElBQUksRUFBRSxZQUFZLEVBQUU7WUFDbEQsV0FBVyxFQUFFLGlCQUFpQjtZQUM5QixPQUFPLEVBQUUsbUJBQW1CO1lBQzVCLEtBQUssRUFBRSxLQUFLO1NBQ2IsQ0FBQyxDQUFDO1FBRUgsTUFBTSxPQUFPLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDbEQsT0FBTyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLGVBQWU7UUFDekMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFFLGdCQUFnQjtRQUU1QyxNQUFNLGFBQWEsR0FBRyxPQUFPLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsZUFBZTtRQUNsRSxhQUFhLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsb0JBQW9CO1FBQ3BELGFBQWEsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxvQkFBb0I7UUFDcEQsYUFBYSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLHVCQUF1QjtJQUM1RCxDQUFDO0lBRU8sZUFBZSxDQUFDLGtCQUE2QjtRQUNqRCxtQ0FBbUM7UUFDbkMscUJBQXFCO1FBRXJCLGNBQWM7UUFDZCxlQUFlO1FBRWYsK0VBQStFO1FBQy9FLHlCQUF5QjtRQUN6Qiw0QkFBNEI7UUFFNUIsNkJBQTZCO1FBQzdCLHdCQUF3QjtRQUV4QixNQUFNLEtBQUssR0FBRyxJQUFJLDhCQUFhLENBQUMsSUFBSSxFQUFFLFdBQVcsRUFBRTtZQUMvQyxXQUFXLEVBQUUsZ0JBQWdCO1lBQzdCLE9BQU8sRUFBRSxrQkFBa0I7WUFDM0IsS0FBSyxFQUFFLEtBQUs7U0FDZixDQUFDLENBQUM7UUFFSCxNQUFNLE1BQU0sR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNoRCxNQUFNLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUUsY0FBYztRQUN4QyxNQUFNLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUUsZUFBZTtRQUUxQyxNQUFNLFlBQVksR0FBRyxNQUFNLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ3RELFlBQVksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBRSx5QkFBeUI7UUFDekQsWUFBWSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLDRCQUE0QjtRQUU5RCxNQUFNLGNBQWMsR0FBRyxNQUFNLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3RELGNBQWMsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyx3QkFBd0I7UUFDdEQsZ0RBQWdEO0lBQ3hELENBQUM7SUFFTyxjQUFjLENBQUMscUJBQWdDO1FBQ25ELHFDQUFxQztRQUNyQyxvQkFBb0I7UUFFcEIsYUFBYTtRQUNoQix3QkFBd0I7UUFDckIsdURBQXVEO1FBQ3ZELHNFQUFzRTtRQUV0RSxNQUFNLEtBQUssR0FBRyxJQUFJLDhCQUFhLENBQUMsSUFBSSxFQUFFLFVBQVUsRUFBRTtZQUM5QyxXQUFXLEVBQUUsZUFBZTtZQUM1QixPQUFPLEVBQUUscUJBQXFCO1lBQzlCLEtBQUssRUFBRSxLQUFLO1NBQ2YsQ0FBQyxDQUFDO1FBRUgsTUFBTSxLQUFLLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDOUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFFLHFCQUFxQjtRQUU5QyxNQUFNLFdBQVcsR0FBRyxLQUFLLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ3BELFdBQVcsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBRSx3QkFBd0I7UUFDbkQsdURBQXVEO1FBQ3ZELHNFQUFzRTtRQUUxRSxPQUFPLFdBQVcsQ0FBQztJQUN2QixDQUFDO0NBQ0o7QUFuR0Qsc0NBbUdDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTGFtYmRhUmVzdEFwaSB9IGZyb20gXCJhd3MtY2RrLWxpYi9hd3MtYXBpZ2F0ZXdheVwiO1xyXG5pbXBvcnQgeyBJRnVuY3Rpb24gfSBmcm9tIFwiYXdzLWNkay1saWIvYXdzLWxhbWJkYVwiO1xyXG5pbXBvcnQgeyBDb25zdHJ1Y3QgfSBmcm9tIFwiY29uc3RydWN0c1wiO1xyXG5cclxuaW50ZXJmYWNlIFN3bkFwaUdhdGV3YXlQcm9wcyB7XHJcbiAgICBwcm9kdWN0TWljcm9zZXJ2aWNlOiBJRnVuY3Rpb24sXHJcbiAgICBiYXNrZXRNaWNyb3NlcnZpY2U6IElGdW5jdGlvbixcclxuICAgIG9yZGVyaW5nTWljcm9zZXJ2aWNlczogSUZ1bmN0aW9uXHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBTd25BcGlHYXRld2F5IGV4dGVuZHMgQ29uc3RydWN0IHsgICAgXHJcblxyXG4gICAgY29uc3RydWN0b3Ioc2NvcGU6IENvbnN0cnVjdCwgaWQ6IHN0cmluZywgcHJvcHM6IFN3bkFwaUdhdGV3YXlQcm9wcykge1xyXG4gICAgICAgIHN1cGVyKHNjb3BlLCBpZCk7XHJcblxyXG4gICAgICAgIC8vIFByb2R1Y3QgYXBpIGdhdGV3YXlcclxuICAgICAgICB0aGlzLmNyZWF0ZVByb2R1Y3RBcGkocHJvcHMucHJvZHVjdE1pY3Jvc2VydmljZSk7XHJcbiAgICAgICAgLy8gQmFza2V0IGFwaSBnYXRld2F5XHJcbiAgICAgICAgdGhpcy5jcmVhdGVCYXNrZXRBcGkocHJvcHMuYmFza2V0TWljcm9zZXJ2aWNlKTtcclxuICAgICAgICAvLyBPcmRlcmluZyBhcGkgZ2F0ZXdheVxyXG4gICAgICAgIHRoaXMuY3JlYXRlT3JkZXJBcGkocHJvcHMub3JkZXJpbmdNaWNyb3NlcnZpY2VzKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGNyZWF0ZVByb2R1Y3RBcGkocHJvZHVjdE1pY3Jvc2VydmljZTogSUZ1bmN0aW9uKSB7XHJcbiAgICAgIC8vIFByb2R1Y3QgbWljcm9zZXJ2aWNlcyBhcGkgZ2F0ZXdheVxyXG4gICAgICAvLyByb290IG5hbWUgPSBwcm9kdWN0XHJcblxyXG4gICAgICAvLyBHRVQgL3Byb2R1Y3RcclxuICAgICAgLy8gUE9TVCAvcHJvZHVjdFxyXG5cclxuICAgICAgLy8gU2luZ2xlIHByb2R1Y3Qgd2l0aCBpZCBwYXJhbWV0ZXJcclxuICAgICAgLy8gR0VUIC9wcm9kdWN0L3tpZH1cclxuICAgICAgLy8gUFVUIC9wcm9kdWN0L3tpZH1cclxuICAgICAgLy8gREVMRVRFIC9wcm9kdWN0L3tpZH1cclxuXHJcbiAgICAgIGNvbnN0IGFwaWd3ID0gbmV3IExhbWJkYVJlc3RBcGkodGhpcywgJ3Byb2R1Y3RBcGknLCB7XHJcbiAgICAgICAgcmVzdEFwaU5hbWU6ICdQcm9kdWN0IFNlcnZpY2UnLFxyXG4gICAgICAgIGhhbmRsZXI6IHByb2R1Y3RNaWNyb3NlcnZpY2UsXHJcbiAgICAgICAgcHJveHk6IGZhbHNlXHJcbiAgICAgIH0pO1xyXG4gIFxyXG4gICAgICBjb25zdCBwcm9kdWN0ID0gYXBpZ3cucm9vdC5hZGRSZXNvdXJjZSgncHJvZHVjdCcpO1xyXG4gICAgICBwcm9kdWN0LmFkZE1ldGhvZCgnR0VUJyk7IC8vIEdFVCAvcHJvZHVjdFxyXG4gICAgICBwcm9kdWN0LmFkZE1ldGhvZCgnUE9TVCcpOyAgLy8gUE9TVCAvcHJvZHVjdFxyXG4gICAgICBcclxuICAgICAgY29uc3Qgc2luZ2xlUHJvZHVjdCA9IHByb2R1Y3QuYWRkUmVzb3VyY2UoJ3tpZH0nKTsgLy8gcHJvZHVjdC97aWR9XHJcbiAgICAgIHNpbmdsZVByb2R1Y3QuYWRkTWV0aG9kKCdHRVQnKTsgLy8gR0VUIC9wcm9kdWN0L3tpZH1cclxuICAgICAgc2luZ2xlUHJvZHVjdC5hZGRNZXRob2QoJ1BVVCcpOyAvLyBQVVQgL3Byb2R1Y3Qve2lkfVxyXG4gICAgICBzaW5nbGVQcm9kdWN0LmFkZE1ldGhvZCgnREVMRVRFJyk7IC8vIERFTEVURSAvcHJvZHVjdC97aWR9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjcmVhdGVCYXNrZXRBcGkoYmFza2V0TWljcm9zZXJ2aWNlOiBJRnVuY3Rpb24pIHtcclxuICAgICAgICAvLyBCYXNrZXQgbWljcm9zZXJ2aWNlcyBhcGkgZ2F0ZXdheVxyXG4gICAgICAgIC8vIHJvb3QgbmFtZSA9IGJhc2tldFxyXG5cclxuICAgICAgICAvLyBHRVQgL2Jhc2tldFxyXG4gICAgICAgIC8vIFBPU1QgL2Jhc2tldFxyXG5cclxuICAgICAgICAvLyAvLyBTaW5nbGUgYmFza2V0IHdpdGggdXNlck5hbWUgcGFyYW1ldGVyIC0gcmVzb3VyY2UgbmFtZSA9IGJhc2tldC97dXNlck5hbWV9XHJcbiAgICAgICAgLy8gR0VUIC9iYXNrZXQve3VzZXJOYW1lfVxyXG4gICAgICAgIC8vIERFTEVURSAvYmFza2V0L3t1c2VyTmFtZX1cclxuXHJcbiAgICAgICAgLy8gY2hlY2tvdXQgYmFza2V0IGFzeW5jIGZsb3dcclxuICAgICAgICAvLyBQT1NUIC9iYXNrZXQvY2hlY2tvdXRcclxuXHJcbiAgICAgICAgY29uc3QgYXBpZ3cgPSBuZXcgTGFtYmRhUmVzdEFwaSh0aGlzLCAnYmFza2V0QXBpJywge1xyXG4gICAgICAgICAgICByZXN0QXBpTmFtZTogJ0Jhc2tldCBTZXJ2aWNlJyxcclxuICAgICAgICAgICAgaGFuZGxlcjogYmFza2V0TWljcm9zZXJ2aWNlLFxyXG4gICAgICAgICAgICBwcm94eTogZmFsc2VcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgY29uc3QgYmFza2V0ID0gYXBpZ3cucm9vdC5hZGRSZXNvdXJjZSgnYmFza2V0Jyk7XHJcbiAgICAgICAgYmFza2V0LmFkZE1ldGhvZCgnR0VUJyk7ICAvLyBHRVQgL2Jhc2tldFxyXG4gICAgICAgIGJhc2tldC5hZGRNZXRob2QoJ1BPU1QnKTsgIC8vIFBPU1QgL2Jhc2tldFxyXG5cclxuICAgICAgICBjb25zdCBzaW5nbGVCYXNrZXQgPSBiYXNrZXQuYWRkUmVzb3VyY2UoJ3t1c2VyTmFtZX0nKTtcclxuICAgICAgICBzaW5nbGVCYXNrZXQuYWRkTWV0aG9kKCdHRVQnKTsgIC8vIEdFVCAvYmFza2V0L3t1c2VyTmFtZX1cclxuICAgICAgICBzaW5nbGVCYXNrZXQuYWRkTWV0aG9kKCdERUxFVEUnKTsgLy8gREVMRVRFIC9iYXNrZXQve3VzZXJOYW1lfVxyXG5cclxuICAgICAgICBjb25zdCBiYXNrZXRDaGVja291dCA9IGJhc2tldC5hZGRSZXNvdXJjZSgnY2hlY2tvdXQnKTtcclxuICAgICAgICBiYXNrZXRDaGVja291dC5hZGRNZXRob2QoJ1BPU1QnKTsgLy8gUE9TVCAvYmFza2V0L2NoZWNrb3V0XHJcbiAgICAgICAgICAgIC8vIGV4cGVjdGVkIHJlcXVlc3QgcGF5bG9hZCA6IHsgdXNlck5hbWUgOiBzd24gfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgY3JlYXRlT3JkZXJBcGkob3JkZXJpbmdNaWNyb3NlcnZpY2VzOiBJRnVuY3Rpb24pIHtcclxuICAgICAgICAvLyBPcmRlcmluZyBtaWNyb3NlcnZpY2VzIGFwaSBnYXRld2F5XHJcbiAgICAgICAgLy8gcm9vdCBuYW1lID0gb3JkZXJcclxuXHJcbiAgICAgICAgLy8gR0VUIC9vcmRlclxyXG5cdCAgICAvLyBHRVQgL29yZGVyL3t1c2VyTmFtZX1cclxuICAgICAgICAvLyBleHBlY3RlZCByZXF1ZXN0IDogeHh4L29yZGVyL3N3bj9vcmRlckRhdGU9dGltZXN0YW1wXHJcbiAgICAgICAgLy8gb3JkZXJpbmcgbXMgZ3JhcCBpbnB1dCBhbmQgcXVlcnkgcGFyYW1ldGVycyBhbmQgZmlsdGVyIHRvIGR5bmFtbyBkYlxyXG5cclxuICAgICAgICBjb25zdCBhcGlndyA9IG5ldyBMYW1iZGFSZXN0QXBpKHRoaXMsICdvcmRlckFwaScsIHtcclxuICAgICAgICAgICAgcmVzdEFwaU5hbWU6ICdPcmRlciBTZXJ2aWNlJyxcclxuICAgICAgICAgICAgaGFuZGxlcjogb3JkZXJpbmdNaWNyb3NlcnZpY2VzLFxyXG4gICAgICAgICAgICBwcm94eTogZmFsc2VcclxuICAgICAgICB9KTtcclxuICAgIFxyXG4gICAgICAgIGNvbnN0IG9yZGVyID0gYXBpZ3cucm9vdC5hZGRSZXNvdXJjZSgnb3JkZXInKTtcclxuICAgICAgICBvcmRlci5hZGRNZXRob2QoJ0dFVCcpOyAgLy8gR0VUIC9vcmRlciAgICAgICAgXHJcbiAgICBcclxuICAgICAgICBjb25zdCBzaW5nbGVPcmRlciA9IG9yZGVyLmFkZFJlc291cmNlKCd7dXNlck5hbWV9Jyk7XHJcbiAgICAgICAgc2luZ2xlT3JkZXIuYWRkTWV0aG9kKCdHRVQnKTsgIC8vIEdFVCAvb3JkZXIve3VzZXJOYW1lfVxyXG4gICAgICAgICAgICAvLyBleHBlY3RlZCByZXF1ZXN0IDogeHh4L29yZGVyL3N3bj9vcmRlckRhdGU9dGltZXN0YW1wXHJcbiAgICAgICAgICAgIC8vIG9yZGVyaW5nIG1zIGdyYXAgaW5wdXQgYW5kIHF1ZXJ5IHBhcmFtZXRlcnMgYW5kIGZpbHRlciB0byBkeW5hbW8gZGJcclxuICAgIFxyXG4gICAgICAgIHJldHVybiBzaW5nbGVPcmRlcjtcclxuICAgIH1cclxufSJdfQ==