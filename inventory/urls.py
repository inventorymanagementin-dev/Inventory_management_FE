"""
URL configuration for inventory project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('login/', views.login_view, name='login'),
    path('register/', views.register_view, name='register'),
    path('', views.dashboard_view, name='dashboard'),
    path('products/', views.products_view, name='products'),
    path('categories/', views.categories_view, name='categories'),
    path('suppliers/', views.suppliers_view, name='suppliers'),
    path('stock/', views.stock_view, name='stock'),
    path('reports/', views.reports_view, name='reports'),
    path('activity-log/', views.activity_log_view, name='activity_log'),
]
