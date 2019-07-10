from django.http import HttpResponseForbidden
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from .serializers import *


@api_view(['GET', 'POST'])
def members_list(request):
	"""
	List  members, or create a new member.
	"""

	if request.method == 'GET':
		data = []
		next_page = 1
		previous_page = 1
		members = Member.objects.all()
		page = request.GET.get('page', 1)
		paginator = Paginator(members, 10)

		try:
			data = paginator.page(page)
		except PageNotAnInteger:
			data = paginator.page(1)
		except EmptyPage:
			data = paginator.page(paginator.num_pages)

		serializer = MemberSerializer(data, context={'request': request}, many=True)

		if data.has_next():
			next_page = data.next_page_number()
		if data.has_previous():
			previous_page = data.previous_page_number()

		return Response({'data': serializer.data, 'count': paginator.count, 'numpages' : paginator.num_pages, 'nextlink': '/api/members/?page=' + str(next_page), 'prevlink': '/api/members/?page=' + str(previous_page)})

	elif request.method == 'POST':
		serializer = MemberSerializer(data=request.data)

		if serializer.is_valid():
			serializer.save()
			return Response(serializer.data, status=status.HTTP_201_CREATED)

		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
def members_detail(request, pk):
	"""
	Retrieve, update or delete a member by id/pk.
	"""
	try:
		member = Member.objects.get(pk=pk)
	except Member.DoesNotExist:
		return Response(status=status.HTTP_404_NOT_FOUND)

	if request.method == 'GET':
		serializer = MemberSerializer(member, context={'request': request})
		return Response(serializer.data)

	elif request.method == 'PUT':
		serializer = MemberSerializer(member, data=request.data, context={'request': request})

		if serializer.is_valid():
			serializer.save()
			return Response(serializer.data)

		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

	elif request.method == 'DELETE':
		member.delete()
		return Response(status=status.HTTP_204_NO_CONTENT)
