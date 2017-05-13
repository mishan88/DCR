"""Test DCR."""
from django.test import TestCase


class ViewTests(TestCase):
    """View Test."""

    def test_index(self):
        """Test 'index.html'."""
        response = self.client.get('/sacred/')
        self.assertEqual(200, response.status_code)

    def test_room(self):
        """Test rooms pages."""
        response = self.client.get('/sacred/room1')
        self.assertEqual(200, response.status_code)
