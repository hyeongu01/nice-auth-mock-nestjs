# Nice Auth Mock Nestjs - nice 인증 목업

> 본 프로젝트는 Nice 휴대폰 본인인증 도입 이전 남는 시간에 만드는 테스트 서버이다. 
> 아래 공식 문서를 참고하여 최대한 유사하게 동작하도록 설정하였음.

참고 공식 문서: [Nice 휴대폰 인증 공식 문서](https://www.niceapi.co.kr/#/apis/guide?ctgrCd=0100&prdId=20&prdNm=PASS%EC%9D%B8%EC%A6%9D%EC%84%9C)

## 기술 스택
- language / framework: `typescript` / `NestJS`
- database: `mysql:8.4.11`
- cache: `redis:7.4`
- ORM: `Prisma 7`
- code formatter: `ESLint`, `Prettier`
- validator: `class-validator`
- testing: `jest`

## 폴더 구조

```bash
src/
- app/
- common/
  - enum/
  - constant/
  - intercepter/
  - guard/
- lib/
  - prisma
  - redis
- module/
  - auth
```
