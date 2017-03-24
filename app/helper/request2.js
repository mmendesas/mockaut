var unirest = require("unirest");

var req = unirest("POST", "http://mockbin.org/bin/create");

req.headers({
    "content-type": "application/x-www-form-urlencoded",
    "accept": "application/json"
});

req.form(JSON.stringify({
    "comment": "Order found",
    "status": 200,
    "statusText": "OK",
    "httpVersion": "HTTP/1.1",
    "redirectURL": "",
    "headersSize": 117,
    "bodySize": 1953,
    "content": {
        "size": 1953,
        "mimeType": "application/json",
        "text": "{\"page\":0,\"limit\":0,\"pages\":0,\"total\":0,\"_embedded\":{\"items\":[{\"id\":\"string\",\"order_number\":0,\"store_id\":0,\"channel\":\"string\",\"grand_total\":0,\"shipping_amount\":0,\"coupon_code\":\"string\",\"payment_method\":\"string\",\"customer_tax_id\":\"string\",\"billing_address\":{\"id\":\"string\",\"first_name\":\"string\",\"last_name\":\"string\",\"address\":\"string\",\"city\":\"string\",\"postcode\":\"string\",\"phone\":\"string\",\"phone_ext\":\"string\",\"country_id\":0,\"is_billing\":false,\"customer_address_region_id\":0,\"additional_info\":\"string\",\"neighborhood\":\"string\",\"cell_phone\":\"string\",\"city_code\":0,\"street_number\":0,\"reference_delivery\":\"string\"},\"shipping_address\":{\"id\":\"string\",\"first_name\":\"string\",\"last_name\":\"string\",\"address\":\"string\",\"city\":\"string\",\"postcode\":\"string\",\"phone\":\"string\",\"phone_ext\":\"string\",\"country_id\":0,\"is_billing\":false,\"customer_address_region_id\":0,\"additional_info\":\"string\",\"neighborhood\":\"string\",\"cell_phone\":\"string\",\"city_code\":0,\"street_number\":0,\"reference_delivery\":\"string\"},\"items\":[{\"id\":\"string\",\"sku\":\"string\",\"name\":\"string\",\"brand\":\"string\",\"unit_price\":0,\"original_unit_price\":0,\"paid_price\":0,\"weight\":0,\"coupon_money_value\":0,\"coupon_category\":0,\"refunded_money\":0,\"refunded_voucher\":0,\"cart_rule_discount\":0,\"cart_rule_display_names\":\"string\",\"erp_id\":\"string\",\"gift_wrap_price\":0,\"negotiation_price_id\":\"string\",\"negotiation_reference_id\":\"string\",\"last_status\":\"string\",\"warehouse\":{\"stock_id\":0,\"out_id\":0},\"carrier\":{\"id\":0,\"contract_id\":\"string\",\"transit_time\":0,\"delivery_type\":0,\"cod_period\":0},\"freight\":{\"costs\":0,\"costs_charged_to_customer\":0,\"transit_time\":0,\"cd_time\":0,\"shipment_type\":0},\"package\":{\"id\":\"string\",\"slip_number\":0,\"shipment_date\":\"2017-03-16T17:57:44.553Z\",\"tracking_url\":\"string\",\"nfe_key\":\"string\"}}],\"additional_info\":{\"customer_session_id\":\"string\",\"ip\":\"string\",\"telesales_user_id\":0,\"host_domain\":\"string\",\"test_ab\":false},\"refund_voucher_amount\":0,\"refund_voucher_code\":\"string\",\"created_at\":\"string\"}]}}"
    },
    "headers": [
        {
            "name": "Date",
            "value": "Thu, 16 Mar 2017 17:57:44 GMT"
        },
        {
            "name": "Connection",
            "value": "keep-alive"
        },
        {
            "name": "Content-Length",
            "value": "1953"
        },
        {
            "name": "Content-Type",
            "value": "application/json"
        }
    ],
    "cookies": [

    ]
}));

req.end(function (res) {
    if (res.error) throw new Error(res.error);

    console.log(res.body);
});