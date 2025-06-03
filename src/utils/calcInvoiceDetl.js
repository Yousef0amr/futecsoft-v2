
export function calculateItemDetails(items, invoice) {
    return items.map((item) => {
        let subTotal = 0;
        let taxAmount = 0;
        let taxPercentage = 0;

        taxPercentage = item.TaxPercentage >= 1
            ? item.TaxPercentage / 100
            : item.TaxPercentage || 0;

        const discountPercentage = (item.ItemDiscountPercentage > 1
            ? item.ItemDiscountPercentage / 100
            : item.ItemDiscountPercentage || 0) + (Number(invoice.DiscountValue) > 1
                ? Number(invoice.DiscountValue) / 100
                : Number(invoice.DiscountValue) || 0)

        const discountAmount = item.ItemDiscount + (Number(invoice.DiscountValue) ?? 0)

        let discount = 0;
        if (discountAmount > 0 && !invoice.enableDiscountPre) {
            discount = discountAmount;
        } else if (discountPercentage > 0) {
            discount = item.UnitPrice * discountPercentage * item.Qty;
        }

        // Normalize unit price if price includes tax
        let unitPrice = item.UnitPrice;
        if (item.PriceIncludeTax && taxPercentage > 0) {
            unitPrice = item.UnitPrice / (1 + taxPercentage);
        }

        subTotal = (unitPrice * item.Qty);
        taxAmount = subTotal * taxPercentage;
        const netTotal = subTotal + taxAmount - discount;

        return {
            DocID: item.DocID,
            ItemId: item.ItemId,
            Unit: item.Unit,
            UnitPrice: item.UnitPrice,
            Qty: item.Qty,
            SubTotal: Number(subTotal.toFixed(3)),
            DiscountPercentage: Number(((discount / (item.UnitPrice * item.Qty)) || 0).toFixed(2)),
            Discount: discount > 0 ? Number(discount.toFixed(3)) : 0,
            TaxPercentage: Number(taxPercentage.toFixed(3)),
            Tax: Number((taxPercentage * subTotal).toFixed(3)),
            GrandTotal: Number(netTotal.toFixed(3)),
        };
    });
}



export function calculateInvoiceTotals(itemDetails) {
    const summary = itemDetails.reduce(
        (acc, item) => {
            acc.SubTotal += item.SubTotal;
            acc.Discount += item.Discount;
            acc.Tax += item.Tax;
            acc.GrandTotal += item.GrandTotal;
            return acc;
        },
        {
            SubTotal: 0,
            Discount: 0,
            Tax: 0,
            GrandTotal: 0,
        }
    );

    const discountPer = summary.SubTotal > 0
        ? (summary.Discount / summary.SubTotal) * 100
        : 0;

    const taxPer = summary.SubTotal > 0
        ? (summary.Tax / summary.SubTotal) * 100
        : 0;

    return {
        subTotal: Number(summary.SubTotal.toFixed(3)),
        discount: Number(summary.Discount.toFixed(3)),
        discountPer: Number(discountPer.toFixed(2)),
        tax: Number(summary.Tax.toFixed(3)),
        taxPer: Number(taxPer.toFixed(2)),
        netTotal: Number(summary.GrandTotal.toFixed(3)),
    };
}





