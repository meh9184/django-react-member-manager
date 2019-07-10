# django-react-member-manager

#### Django와 React를 이용하여 구현한 간단한 회원 관리 Web App

<div>
  <div width='100%'>
    <img src="./app/assets/images/screenshot-main-1.jpg" width='48%'/>
    <img src="./app/assets/images/screenshot-main-4.jpg" width='48%'/>
  </div>
  <div width='100%'>
    <img src="./app/assets/images/screenshot-main-3.jpg" width='48%'/>
    <img src="./app/assets/images/screenshot-main-2.jpg" width='48%'/>
  </div>
</div>
<br>

<br/>

## *Introduction*


### Summary
> - 간단한 회원관리 웹 어플리케이션을 구현
> 
> - BACK-END : Django를 이용하여 회원 정보 저장용 REST API를 구현
>
> - FRONT-END : React를 이용하여 회원 정보 CRUD 제공할 웹 어플리케이션 구현
> 
> - 웹 브라우저를 통해 CRUD 서비스
> 
> - 서버는 REST하게 설계되었기 때문에 HTTP 의 ruequst 이용한 CRUD 서비스도 가능


### Requirements
> - [Python 3.6](https://www.python.org/downloads/release/python-360/) 
> - [Django 2.2.3](https://docs.djangoproject.com/en/2.2/releases/2.2.3/)
> - [React 16.8.6](https://www.npmjs.com/package/react?activeTab=versions)
> - [MySQL 5.6](https://dev.mysql.com/downloads/mysql/5.6.html)


### End-points

> **Resource modeling**
> 
> - 회원(Member) 모델을 RESTful하게 리소스를 모델링
> 
> |  HTTP |  Path |  Method |  목적 |
> | --- | --- | --- | --- |
> |**GET** |/api/member|Create|Member 생성 Form|
> |**GET** |/api/members|List|모든 Member 조회|
> |**POST** |/api/members|Create|하나의 Member 생성|
> |**GET** |/api/members/member_id|Read|하나의 Member 조회|
> |**PUT** |/api/members/member_id|Update|하나의 Member 수정|
> |**DELETE** |/api/members/member_id|Delete|하나의 Member 삭제|
> 
> **Urls**
> 
> - `backend/django_member_manager/django_member_manager/urls.py`
> ```python
> from django.contrib import admin
> from django.urls import path
> from members import views
> from django.conf.urls import url
> 
> urlpatterns = [
>     path('admin/', admin.site.urls),
>     url(r'^api/members/$', views.members_list),
>     url(r'^api/members/(?P<pk>[0-9]+)$', views.members_detail),
> ]
> ```

### Models
> 
> **Database schema**
> <img src="./app/assets/images/data-schema.jpg" alt="database-schema"/>


### System configuration
> 
> **Service flow**
> <img src="./app/assets/images/system-configuration.jpg" alt="system-configuration"/>

<br/>

## *Installation*

### Clone project
> 
> - Github repository를 clone
> ```bash
> $ git clone https://github.com/meh9184/django-react-member-manager.git
> ```
> 

### Configure  db connection
> 
> - `backend/django_member_manager/django_member_manager/settings.py` 파일의
> - DATABASES 부분 USER, PASSWORD 입력
> 
> ```python
> # Database
> # https://docs.djangoproject.com/en/2.2/ref/settings/#databases
> 
> DATABASES = {
>     'default': {
>         'ENGINE': 'django.db.backends.mysql',
>         'NAME': 'member_manager',
>         'USER': 'INSERT HERE',        # 여기에 입력
>         'PASSWORD': 'INSERT HERE',    # 여기에 입력
>         'HOST': '127.0.0.1',
>         'PORT': '3306'
>     }
> }
> ```

### Create mysql schema 
> 
> - MySQL CLI 상에서 `member_manager` 이름으로 스키마 생성
> ```bash
> mysql> create schema member_manager
> ```

### Backend installation

> - backend 디렉터리 `django-react-member-manager/backend`로 이동
> ```bash
> $ cd backend
> ```
>
> - virtaulenv 설치 안됐다면 apt-get으로 설치하고,
> - virtaulenv 명령어로 현재 디렉터리에 가상환경 `venv` 생성 및 활성화
> ```bash
> $ sudo apt-get install virtualenv
> $ virtualenv --python=python3 venv
> $ source venv/bin/activate
> ```
>
> - 현재 가상 환경에 requirements.txt에 적혀있는 dependencies 설치
> ```bash
> $ pip install -r requirements.txt
> ```
>
> - DB 모델을 migrate 하기 위해 `django-react-member-manager/backend/django_member_manager/`로 이동
> ```bash
> $ cd django_member_manager
> ```
>
> - DB migration 생성하고 migrate 명령어를 통해 MySQL에 테이블 생성
> ```bash
> $ python manage.py makemigrations
> $ python manage.py migrate
> ```
>
> - migrate 작업 완료됐으면 서버 실행
> ```bash
> $ python manage.py runserver
> ```

### Frontend Installation

> - 새로운 쉘 생성하여 frontend 디렉터리 `django-react-member-manager/frontend`로 이동
> ```bash
> $ cd frontend
> ```
>
> - yarn 설치 안됐다면 apt-get으로 설치하고,
> - yarn install 명령어로 노드 모듈 셋업
> ```bash
> $ sudo apt-get install yarn
> $ yarn install
> ```
>
> - install 완료 됐으면 react-app 실행
> ```bash
> $ yarn start
> ```

<br/>

## *Usage*


### Generate data

> - 위의 Step대로 진행하여 서버 setting 및 run까지 완료했다면, 현재 DB는 비어있고
> - python manage.py migrate 명령에서 실행한 002_create_permissions.py를 통해 
> - Permission 초기 값들(6개 권한 값들)만 생성된 상태
> - `SELECT * FROM members_manager.members_permission` 결과
> 
> |  ID |  NAME |
> | --- | --- |
> |1 |master|
> |2 |diamond|
> |3 |platinum|
> |4 |gold|
> |5 |silver|
> |6 |bronze|
>
> - master 권한의 member 와 랜덤한 member들을 생성하기 위해 
> - 새로운 쉘을 생성하여 `/backend/django_member_manager` 폴더로 이동
> ```bash
> $ cd backend
> $ cd django_member_manager
> ```
>
> - createmastermember 커스텀 명령어로 master member 생성
> ```bash
> $ python manage.py createmastermember
> ```
>
> - makemembers 커스텀 명령어로 n개의 랜덤한 member 생성
> - Usage ex) python manage.py makemembers 30  -> 30개의 랜덤한 member 생성
> - Usage ex) python manage.py makemembers 220 -> 220개의 랜덤한 member 생성
> ```bash
> $ python manage.py makemembers 30
> ```
> 
> - 웹 브라우저로 접속하여 데이터 잘 추가 되었는지 확인
>   - [http://localhost:3000/](http://localhost:3000/)
> 
> - React app 상단의 CREATE MEMBER / MEMBERS 를 통해 `CREATE` / `READ` 동작 수행
> - 각 Members 컴포넌트의 Update / Delete 버튼을 통해 `UPDATE` / `DELETE` 동작 수행  
> 


<br/>

## *Results*

### Views
> 
> ### List
> 
> |  HTTP |  Path |  Method |  목적 |
> | --- | --- | --- | --- |
> |**GET** |/api/members|List|모든 Member 조회|
>
> <img src="./app/assets/images/screenshot-home.jpg" alt="screenshot-index" width='62%' height='62%'/>
> <br/>
> <br/>
> 
> ### Read / Update
> 
> |  HTTP |  Path |  Method |  목적 |
> | --- | --- | --- | --- |
> |**GET** |/api/members/member_id|Read|하나의 Member 조회|
> |**UPDATE** |/api/members/member_id|Update|하나의 Member 수정|
>
> <img src="./app/assets/images/screenshot-show.jpg" alt="screenshot-show" width='62%' height='62%'/>
> <br/>
> <br/>
>  
> ### Create
> 
> |  HTTP |  Path |  Method |  목적 |
> | --- | --- | --- | --- |
> |**GET** |/api/member|Create|Member 생성 Form|
>
> <img src="./app/assets/images/screenshot-new.jpg" alt="screenshot-new" width='62%' height='62%'/>
> <br/>
> <br/>
> 

<br/>

## *Addition Commentary*
> 
### Some rules
> - 가독성과 크롤링 시간 효율을 위해 크롤링 수행시 Movie 및 TV의 cast와 crew는 최대 5개씩만 수집하도록 제한하였으며, Person의 영화 출연작과 TV 출연작 역시 5개씩 수집하도록 제한하였습니다.
> - Home 인덱스 페이지에서 Movies, Tvs, People 각각 3개의 대표 데이터는 무작위로 뽑고, 이미지가 존재하는 data 중에서 선별합니다.
> - Movie, Tv 인덱스 페이지에서 데이터는 업데이트 시간 내림차순으로 정렬합니다.
> - People 인덱스 페이지에서 데이터는 업데이트 시간 오름차순으로 정렬합니다.
> 

### Issues
> - 현재의 Crawler 는 사실상 평점/인기 높은 데이터를 순차적으로 가져오는 Scraper 정도 되는것 같음. API를 통해 리소스들에 타고 들어가면서 데이터를 수집하는 정통적인 Crawler 개발 필요
> - TV의 에피소드, 시리즈 정보는 데이터 모델링 하지 못함. Ruby on Rails 의 모델링 문법과 방법에 대해 더 공부할 필요 있음.
> 

### Tools for Windows OS Users
> - [WSL (Windows Subsystem for Linux)](https://docs.microsoft.com/ko-kr/windows/wsl/install-win10)
> - [VSCode](https://code.visualstudio.com/docs/?dv=win)
> - [Mysql Workbench](https://www.mysql.com/products/workbench/)
> - [Postman](https://www.getpostman.com/downloads/)
> - [Github](https://github.com/meh9184/tmdb-rails)
> 

<br/>

## *References*
> 
> - https://medium.com/@shaircast/ruby-on-rails-on-wsl-%EC%9C%88%EB%8F%84%EC%9A%B0-10%EC%97%90%EC%84%9C-%EB%A0%88%EC%9D%BC%EC%A6%88-%EC%84%A4%EC%B9%98%ED%95%98%EA%B8%B0-9a6164df51f
> - https://docs.microsoft.com/ko-kr/windows/wsl/install-win10
> - https://gorails.com/setup/windows/10
> - https://medium.com/@colinrubbert/installing-ruby-on-rails-in-windows-10-w-bash-postgresql-e48e55954fbf
> - https://github.com/luciuschoi/wsl_setting_for_rails
> - https://medium.com/@joystar/%EC%9C%88%EB%8F%84%EC%9A%B0-wsl-18-04%EC%97%90%EC%84%9C-%EB%A0%88%EC%9D%BC%EC%A6%88-%EA%B0%9C%EB%B0%9C%ED%99%98%EA%B2%BD-%EC%84%A4%EC%A0%95%ED%95%98%EA%B8%B0-252b04dae45b
> - https://rubykr.github.io/rails_guides/getting_started.html
> 
