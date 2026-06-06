from django.shortcuts import render, redirect, get_object_or_404
from core.models import Category, Supplier, Product, StockTransaction
from core.forms import CategoryForm, SupplierForm, ProductForm, StockTransactionForm
from django.db.models import Sum

def login_view(request):
    return render(request, 'login.html')

def register_view(request):
    return render(request, 'register.html')

def dashboard_view(request):
    total_products = Product.objects.count()
    low_stock_products = Product.objects.filter(status__in=['Low Stock', 'Out of Stock'])[:5]
    low_stock = Product.objects.filter(status='Low Stock').count() + Product.objects.filter(status='Out of Stock').count()
    total_suppliers = Supplier.objects.count()
    recent_transactions = StockTransaction.objects.order_by('-date')[:5]
    
    context = {
        'total_products': total_products,
        'low_stock_products': low_stock_products,
        'low_stock': low_stock,
        'total_suppliers': total_suppliers,
        'recent_transactions': recent_transactions,
    }
    return render(request, 'dashboard.html', context)

def products_view(request):
    if request.method == 'POST':
        action = request.POST.get('action')
        if action == 'create':
            form = ProductForm(request.POST)
            if form.is_valid():
                form.save()
        elif action == 'edit':
            prod_id = request.POST.get('id')
            prod = get_object_or_404(Product, id=prod_id)
            form = ProductForm(request.POST, instance=prod)
            if form.is_valid():
                form.save()
        elif action == 'delete':
            prod_id = request.POST.get('id')
            prod = get_object_or_404(Product, id=prod_id)
            prod.delete()
        return redirect('products')

    products = Product.objects.all().order_by('-created_at')
    categories = Category.objects.all()
    suppliers = Supplier.objects.all()
    context = {
        'products': products,
        'categories': categories,
        'suppliers': suppliers,
    }
    return render(request, 'products.html', context)

def categories_view(request):
    if request.method == 'POST':
        action = request.POST.get('action')
        if action == 'create':
            form = CategoryForm(request.POST)
            if form.is_valid():
                form.save()
        elif action == 'edit':
            cat_id = request.POST.get('id')
            cat = get_object_or_404(Category, id=cat_id)
            form = CategoryForm(request.POST, instance=cat)
            if form.is_valid():
                form.save()
        elif action == 'delete':
            cat_id = request.POST.get('id')
            cat = get_object_or_404(Category, id=cat_id)
            cat.delete()
        return redirect('categories')

    categories = Category.objects.all().order_by('-created_at')
    return render(request, 'categories.html', {'categories': categories})

def suppliers_view(request):
    if request.method == 'POST':
        action = request.POST.get('action')
        if action == 'create':
            form = SupplierForm(request.POST)
            if form.is_valid():
                form.save()
        elif action == 'edit':
            sup_id = request.POST.get('id')
            sup = get_object_or_404(Supplier, id=sup_id)
            form = SupplierForm(request.POST, instance=sup)
            if form.is_valid():
                form.save()
        elif action == 'delete':
            sup_id = request.POST.get('id')
            sup = get_object_or_404(Supplier, id=sup_id)
            sup.delete()
        return redirect('suppliers')

    suppliers = Supplier.objects.all().order_by('-created_at')
    return render(request, 'suppliers.html', {'suppliers': suppliers})

def stock_view(request):
    if request.method == 'POST':
        form = StockTransactionForm(request.POST)
        if form.is_valid():
            transaction = form.save()
            product = transaction.product
            if transaction.transaction_type == 'IN':
                product.quantity_in_stock += transaction.quantity
            elif transaction.transaction_type == 'OUT':
                product.quantity_in_stock -= transaction.quantity
            
            # Update product status
            if product.quantity_in_stock <= 0:
                product.status = 'Out of Stock'
            elif product.quantity_in_stock <= product.reorder_level:
                product.status = 'Low Stock'
            else:
                product.status = 'In Stock'
            product.save()
        return redirect('stock')

    transactions = StockTransaction.objects.all().order_by('-date')
    products = Product.objects.all()
    context = {
        'transactions': transactions,
        'products': products,
    }
    return render(request, 'stock.html', context)

def reports_view(request):
    return render(request, 'reports.html')

def activity_log_view(request):
    return render(request, 'activity_log.html')
