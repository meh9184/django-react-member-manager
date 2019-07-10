#!/usr/bin/env python
from django.core.management.base import BaseCommand 
from members.models import Member, Permission

class Command(BaseCommand):
    help = 'Create master member'


    def handle(self, *args, **kwargs):

        if len(Member.objects.filter(permission=1)) == 0:
            name = input('name       :')

            account = input('account    :')
            while '@' not in account:
                print('\nemail 형식으로 입력해주세요 ex) meh9184@example.com')
                account = input('account    :')

            count = 0
            while count < 3: 
                password = input('password   :')
                if password == input('pw 확인    :'):
                    permission = Permission.objects.get(id=1)

                    member = Member(
                        name = name,
                        password = password,
                        account = account,
                        permission = permission
                    )

                    member.save()
                    
                    print('Complete to create master member')
                    return
                else:
                    print('\npassword가 다릅니다. 다시 입력해주세요.')
                    count += 1

            print('3회 이상 입력 실패')

        else:
            print('Aleady exists master member')