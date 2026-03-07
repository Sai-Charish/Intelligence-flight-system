from rest_framework.routers import DefaultRouter
from .views import FlightViewSet, BookingViewSet, PriceHistoryViewSet, CityViewSet

router = DefaultRouter()
router.register(r'flights', FlightViewSet)
router.register(r'bookings', BookingViewSet)
router.register(r'price-history', PriceHistoryViewSet)
router.register(r'cities', CityViewSet)

urlpatterns = router.urls