"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SwnDatabase = void 0;
const aws_cdk_lib_1 = require("aws-cdk-lib");
const aws_dynamodb_1 = require("aws-cdk-lib/aws-dynamodb");
const constructs_1 = require("constructs");
class SwnDatabase extends constructs_1.Construct {
    constructor(scope, id) {
        super(scope, id);
        //product table
        this.productTable = this.createProductTable();
        //basket table
        this.basketTable = this.createBasketTable();
        //order table
        this.orderTable = this.createOrderTable();
    }
    // Product DynamoDb Table Creation
    // product : PK: id -- name - description - imageFile - price - category
    createProductTable() {
        const productTable = new aws_dynamodb_1.Table(this, 'product', {
            partitionKey: {
                name: 'id',
                type: aws_dynamodb_1.AttributeType.STRING
            },
            tableName: 'product',
            removalPolicy: aws_cdk_lib_1.RemovalPolicy.DESTROY,
            billingMode: aws_dynamodb_1.BillingMode.PAY_PER_REQUEST
        });
        return productTable;
    }
    // Basket DynamoDb Table Creation
    // basket : PK: userName -- items (SET-MAP object) 
    // item1 - { quantity - color - price - productId - productName }
    // item2 - { quantity - color - price - productId - productName }
    createBasketTable() {
        const basketTable = new aws_dynamodb_1.Table(this, 'basket', {
            partitionKey: {
                name: 'userName',
                type: aws_dynamodb_1.AttributeType.STRING,
            },
            tableName: 'basket',
            removalPolicy: aws_cdk_lib_1.RemovalPolicy.DESTROY,
            billingMode: aws_dynamodb_1.BillingMode.PAY_PER_REQUEST
        });
        return basketTable;
    }
    // Order DynamoDb Table Creation
    // order : PK: userName - SK: orderDate -- totalPrice - firstName - lastName - email - address - paymentMethod - cardInfo
    createOrderTable() {
        const orderTable = new aws_dynamodb_1.Table(this, 'order', {
            partitionKey: {
                name: 'userName',
                type: aws_dynamodb_1.AttributeType.STRING,
            },
            sortKey: {
                name: 'orderDate',
                type: aws_dynamodb_1.AttributeType.STRING,
            },
            tableName: 'order',
            removalPolicy: aws_cdk_lib_1.RemovalPolicy.DESTROY,
            billingMode: aws_dynamodb_1.BillingMode.PAY_PER_REQUEST
        });
        return orderTable;
    }
}
exports.SwnDatabase = SwnDatabase;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YWJhc2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkYXRhYmFzZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSw2Q0FBNEM7QUFDNUMsMkRBQXFGO0FBQ3JGLDJDQUF1QztBQUV2QyxNQUFhLFdBQVksU0FBUSxzQkFBUztJQU10QyxZQUFZLEtBQWdCLEVBQUUsRUFBVTtRQUNwQyxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBRWhCLGVBQWU7UUFDZixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1FBQzlDLGNBQWM7UUFDZCxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBQzVDLGFBQWE7UUFDYixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO0lBQy9DLENBQUM7SUFFRCxrQ0FBa0M7SUFDbEMsd0VBQXdFO0lBQ2hFLGtCQUFrQjtRQUN4QixNQUFNLFlBQVksR0FBRyxJQUFJLG9CQUFLLENBQUMsSUFBSSxFQUFFLFNBQVMsRUFBRTtZQUM5QyxZQUFZLEVBQUU7Z0JBQ1osSUFBSSxFQUFFLElBQUk7Z0JBQ1YsSUFBSSxFQUFFLDRCQUFhLENBQUMsTUFBTTthQUMzQjtZQUNELFNBQVMsRUFBRSxTQUFTO1lBQ3BCLGFBQWEsRUFBRSwyQkFBYSxDQUFDLE9BQU87WUFDcEMsV0FBVyxFQUFFLDBCQUFXLENBQUMsZUFBZTtTQUN6QyxDQUFDLENBQUM7UUFDSCxPQUFPLFlBQVksQ0FBQztJQUN0QixDQUFDO0lBRUQsaUNBQWlDO0lBQzdCLG1EQUFtRDtJQUNqRCxpRUFBaUU7SUFDakUsaUVBQWlFO0lBQy9ELGlCQUFpQjtRQUN2QixNQUFNLFdBQVcsR0FBRyxJQUFJLG9CQUFLLENBQUMsSUFBSSxFQUFFLFFBQVEsRUFBRTtZQUM1QyxZQUFZLEVBQUU7Z0JBQ1osSUFBSSxFQUFFLFVBQVU7Z0JBQ2hCLElBQUksRUFBRSw0QkFBYSxDQUFDLE1BQU07YUFDM0I7WUFDRCxTQUFTLEVBQUUsUUFBUTtZQUNuQixhQUFhLEVBQUUsMkJBQWEsQ0FBQyxPQUFPO1lBQ3BDLFdBQVcsRUFBRSwwQkFBVyxDQUFDLGVBQWU7U0FDekMsQ0FBQyxDQUFDO1FBQ0gsT0FBTyxXQUFXLENBQUM7SUFDckIsQ0FBQztJQUVELGdDQUFnQztJQUNoQyx5SEFBeUg7SUFDakgsZ0JBQWdCO1FBQ3RCLE1BQU0sVUFBVSxHQUFHLElBQUksb0JBQUssQ0FBQyxJQUFJLEVBQUUsT0FBTyxFQUFFO1lBQ3hDLFlBQVksRUFBRTtnQkFDWixJQUFJLEVBQUUsVUFBVTtnQkFDaEIsSUFBSSxFQUFFLDRCQUFhLENBQUMsTUFBTTthQUMzQjtZQUNELE9BQU8sRUFBRTtnQkFDUCxJQUFJLEVBQUUsV0FBVztnQkFDakIsSUFBSSxFQUFFLDRCQUFhLENBQUMsTUFBTTthQUMzQjtZQUNELFNBQVMsRUFBRSxPQUFPO1lBQ2xCLGFBQWEsRUFBRSwyQkFBYSxDQUFDLE9BQU87WUFDcEMsV0FBVyxFQUFFLDBCQUFXLENBQUMsZUFBZTtTQUMzQyxDQUFDLENBQUM7UUFDSCxPQUFPLFVBQVUsQ0FBQztJQUNwQixDQUFDO0NBRUo7QUFwRUQsa0NBb0VDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUmVtb3ZhbFBvbGljeSB9IGZyb20gXCJhd3MtY2RrLWxpYlwiO1xyXG5pbXBvcnQgeyBBdHRyaWJ1dGVUeXBlLCBCaWxsaW5nTW9kZSwgSVRhYmxlLCBUYWJsZSB9IGZyb20gXCJhd3MtY2RrLWxpYi9hd3MtZHluYW1vZGJcIjtcclxuaW1wb3J0IHsgQ29uc3RydWN0IH0gZnJvbSBcImNvbnN0cnVjdHNcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBTd25EYXRhYmFzZSBleHRlbmRzIENvbnN0cnVjdCB7XHJcblxyXG4gICAgcHVibGljIHJlYWRvbmx5IHByb2R1Y3RUYWJsZTogSVRhYmxlO1xyXG4gICAgcHVibGljIHJlYWRvbmx5IGJhc2tldFRhYmxlOiBJVGFibGU7XHJcbiAgICBwdWJsaWMgcmVhZG9ubHkgb3JkZXJUYWJsZTogSVRhYmxlO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHNjb3BlOiBDb25zdHJ1Y3QsIGlkOiBzdHJpbmcpIHtcclxuICAgICAgICBzdXBlcihzY29wZSwgaWQpO1xyXG4gICAgICBcclxuICAgICAgICAgLy9wcm9kdWN0IHRhYmxlXHJcbiAgICAgICAgIHRoaXMucHJvZHVjdFRhYmxlID0gdGhpcy5jcmVhdGVQcm9kdWN0VGFibGUoKTtcclxuICAgICAgICAgLy9iYXNrZXQgdGFibGVcclxuICAgICAgICAgdGhpcy5iYXNrZXRUYWJsZSA9IHRoaXMuY3JlYXRlQmFza2V0VGFibGUoKTtcclxuICAgICAgICAgLy9vcmRlciB0YWJsZVxyXG4gICAgICAgICB0aGlzLm9yZGVyVGFibGUgPSB0aGlzLmNyZWF0ZU9yZGVyVGFibGUoKTsgXHJcbiAgICB9XHJcblxyXG4gICAgLy8gUHJvZHVjdCBEeW5hbW9EYiBUYWJsZSBDcmVhdGlvblxyXG4gICAgLy8gcHJvZHVjdCA6IFBLOiBpZCAtLSBuYW1lIC0gZGVzY3JpcHRpb24gLSBpbWFnZUZpbGUgLSBwcmljZSAtIGNhdGVnb3J5XHJcbiAgICBwcml2YXRlIGNyZWF0ZVByb2R1Y3RUYWJsZSgpIDogSVRhYmxlIHtcclxuICAgICAgY29uc3QgcHJvZHVjdFRhYmxlID0gbmV3IFRhYmxlKHRoaXMsICdwcm9kdWN0Jywge1xyXG4gICAgICAgIHBhcnRpdGlvbktleToge1xyXG4gICAgICAgICAgbmFtZTogJ2lkJyxcclxuICAgICAgICAgIHR5cGU6IEF0dHJpYnV0ZVR5cGUuU1RSSU5HXHJcbiAgICAgICAgfSxcclxuICAgICAgICB0YWJsZU5hbWU6ICdwcm9kdWN0JyxcclxuICAgICAgICByZW1vdmFsUG9saWN5OiBSZW1vdmFsUG9saWN5LkRFU1RST1ksXHJcbiAgICAgICAgYmlsbGluZ01vZGU6IEJpbGxpbmdNb2RlLlBBWV9QRVJfUkVRVUVTVFxyXG4gICAgICB9KTtcclxuICAgICAgcmV0dXJuIHByb2R1Y3RUYWJsZTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBCYXNrZXQgRHluYW1vRGIgVGFibGUgQ3JlYXRpb25cclxuICAgICAgICAvLyBiYXNrZXQgOiBQSzogdXNlck5hbWUgLS0gaXRlbXMgKFNFVC1NQVAgb2JqZWN0KSBcclxuICAgICAgICAgIC8vIGl0ZW0xIC0geyBxdWFudGl0eSAtIGNvbG9yIC0gcHJpY2UgLSBwcm9kdWN0SWQgLSBwcm9kdWN0TmFtZSB9XHJcbiAgICAgICAgICAvLyBpdGVtMiAtIHsgcXVhbnRpdHkgLSBjb2xvciAtIHByaWNlIC0gcHJvZHVjdElkIC0gcHJvZHVjdE5hbWUgfVxyXG4gICAgcHJpdmF0ZSBjcmVhdGVCYXNrZXRUYWJsZSgpIDogSVRhYmxlIHtcclxuICAgICAgY29uc3QgYmFza2V0VGFibGUgPSBuZXcgVGFibGUodGhpcywgJ2Jhc2tldCcsIHtcclxuICAgICAgICBwYXJ0aXRpb25LZXk6IHtcclxuICAgICAgICAgIG5hbWU6ICd1c2VyTmFtZScsXHJcbiAgICAgICAgICB0eXBlOiBBdHRyaWJ1dGVUeXBlLlNUUklORyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIHRhYmxlTmFtZTogJ2Jhc2tldCcsXHJcbiAgICAgICAgcmVtb3ZhbFBvbGljeTogUmVtb3ZhbFBvbGljeS5ERVNUUk9ZLFxyXG4gICAgICAgIGJpbGxpbmdNb2RlOiBCaWxsaW5nTW9kZS5QQVlfUEVSX1JFUVVFU1RcclxuICAgICAgfSk7XHJcbiAgICAgIHJldHVybiBiYXNrZXRUYWJsZTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBPcmRlciBEeW5hbW9EYiBUYWJsZSBDcmVhdGlvblxyXG4gICAgLy8gb3JkZXIgOiBQSzogdXNlck5hbWUgLSBTSzogb3JkZXJEYXRlIC0tIHRvdGFsUHJpY2UgLSBmaXJzdE5hbWUgLSBsYXN0TmFtZSAtIGVtYWlsIC0gYWRkcmVzcyAtIHBheW1lbnRNZXRob2QgLSBjYXJkSW5mb1xyXG4gICAgcHJpdmF0ZSBjcmVhdGVPcmRlclRhYmxlKCkgOiBJVGFibGUge1xyXG4gICAgICBjb25zdCBvcmRlclRhYmxlID0gbmV3IFRhYmxlKHRoaXMsICdvcmRlcicsIHtcclxuICAgICAgICAgIHBhcnRpdGlvbktleToge1xyXG4gICAgICAgICAgICBuYW1lOiAndXNlck5hbWUnLFxyXG4gICAgICAgICAgICB0eXBlOiBBdHRyaWJ1dGVUeXBlLlNUUklORyxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBzb3J0S2V5OiB7XHJcbiAgICAgICAgICAgIG5hbWU6ICdvcmRlckRhdGUnLFxyXG4gICAgICAgICAgICB0eXBlOiBBdHRyaWJ1dGVUeXBlLlNUUklORyxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB0YWJsZU5hbWU6ICdvcmRlcicsXHJcbiAgICAgICAgICByZW1vdmFsUG9saWN5OiBSZW1vdmFsUG9saWN5LkRFU1RST1ksXHJcbiAgICAgICAgICBiaWxsaW5nTW9kZTogQmlsbGluZ01vZGUuUEFZX1BFUl9SRVFVRVNUXHJcbiAgICAgIH0pO1xyXG4gICAgICByZXR1cm4gb3JkZXJUYWJsZTtcclxuICAgIH1cclxuXHJcbn1cclxuXHJcbiJdfQ==