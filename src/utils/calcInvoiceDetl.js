function calculateInvoiceDetail(items, invoice) {
    let summary = {
        TotalSubTotal: 0,
        TotalDiscount: 0,
        TotalTax: 0,
        TotalGrand: 0,
    };

    const details = items.map((item) => {
        let unitPrice = 0,
            subTotal = 0,
            netTotal = 0,
            tax = 0,
            taxPer = 0,
            discount = 0,
            discountPer = 0;

        // Get tax percentage
        let taxPercentage = parseFloat(+invoice.TaxPercentage ?? 0);


        if (isNaN(taxPercentage)) taxPercentage = 0;
        if (taxPercentage >= 1) taxPercentage = taxPercentage / 100;

        // Normalize discount percentage
        let discountPercentage =
            item.ItemDiscountPercentage > 1
                ? item.ItemDiscountPercentage / 100
                : item.ItemDiscountPercentage || 0;

        // Calculate discount
        if (item.ItemDiscount > 0) {
            discount = item.ItemDiscount;
        }
        if (discountPercentage > 0) {
            discount = item.UnitPrice * discountPercentage * item.Qty;
        }

        // Determine unit price and applicable tax

        if (invoice.PriceIncludeTax) {
            unitPrice = item.UnitPrice / (1 + taxPercentage);
            taxPer = taxPercentage;
        } else {
            unitPrice = item.UnitPrice;
            taxPer = 0;
        }


        subTotal = unitPrice * item.Qty;
        tax = (subTotal - discount) * taxPer;
        netTotal = subTotal - discount + tax;
        discountPer = subTotal !== 0 ? discount / subTotal : 0;

        summary.TotalSubTotal += subTotal;
        summary.TotalDiscount += discount;
        summary.TotalTax += tax;
        summary.TotalGrand += netTotal;

        return {
            ItemId: item.ItemId,
            Unit: item.Unit,
            UnitPrice: item.UnitPrice,
            Qty: item.Qty,
            SubTotal: Number(subTotal.toFixed(3)),
            DiscountPercentage: Number((discountPer * 100).toFixed(2)),
            Discount: Number(discount.toFixed(3)),
            TaxPercentage: Number(taxPer.toFixed(3)),
            Tax: Number(tax.toFixed(3)),
            GrandTotal: Number(netTotal.toFixed(3)),
        };
    });

    const TotalDiscountPercentage =
        summary.TotalSubTotal > 0
            ? Number(((summary.TotalDiscount / summary.TotalSubTotal) * 100).toFixed(2))
            : 0;

    const totals = {
        subTotal: Number(summary.TotalSubTotal.toFixed(3)),
        discount: Number(summary.TotalDiscount.toFixed(3)),
        discountPer: Number(TotalDiscountPercentage),
        tax: Number(summary.TotalTax.toFixed(3)),
        netTotal: Number(summary.TotalGrand.toFixed(3)),
        TaxPercentage: Number(invoice.TaxPercentage),
    };

    return { details, totals };
}

export default calculateInvoiceDetail;



