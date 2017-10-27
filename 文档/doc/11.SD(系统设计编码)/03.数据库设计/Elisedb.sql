/*==============================================================*/
/* DBMS name:      MySQL 5.0                                    */
/* Created on:     2017/9/21 11:52:03                           */
/*==============================================================*/


drop table if exists Auth_Role;

drop table if exists Auth_User;

drop table if exists Auth_UserRole;

drop table if exists Cfg_Dictionary;

drop table if exists Cfg_PageModel;

drop table if exists Cfg_PageModelProperty;

drop table if exists Cfg_Site;

drop table if exists Cfg_Site_Account;

drop table if exists Cfg_Site_Cookies;

drop table if exists Cfg_Site_Login;

drop table if exists Cfg_Task;

drop table if exists Cfg_Task_Browser;

drop table if exists Cfg_pageTurning;

/*==============================================================*/
/* Table: Auth_Role                                             */
/*==============================================================*/
create table Auth_Role
(
   roleId               int not null,
   roleName             varchar(50) character set utf-8,
   primary key (roleId)
);

/*==============================================================*/
/* Table: Auth_User                                             */
/*==============================================================*/
create table Auth_User
(
   userId               int not null,
   userName             varchar(50) not null,
   loginName            varchar(50) not null,
   pwd                  varchar(50) not null,
   createTime           bigint,
   creatorId            int not null,
   updateTime           bigint,
   updatePersonId       int not null,
   lastLoginTime        bigint,
   enabled              int,
   primary key (userId)
);

/*==============================================================*/
/* Table: Auth_UserRole                                         */
/*==============================================================*/
create table Auth_UserRole
(
   userRoleId           int not null,
   roleId               int,
   userId               int,
   primary key (userRoleId)
);

/*==============================================================*/
/* Table: Cfg_Dictionary                                        */
/*==============================================================*/
create table Cfg_Dictionary
(
   dict_Type            int not null,
   dict_Name            varchar(30),
   item_Type            int not null,
   item_Name            varchar(30),
   remark               varchar(200),
   primary key (dict_Type, item_Type)
);

/*==============================================================*/
/* Table: Cfg_PageModel                                         */
/*==============================================================*/
create table Cfg_PageModel
(
   modelId              int not null,
   version              int not null,
   modelName            varchar(200) not null,
   modelType            int not null comment '1、只抽取urls,2,抽取详情（包含列表的抽取：如评论）',
   browserType          int not null comment '1:普通下载(httpclient);2:浏览器下载(js渲染下载)',
   urlPropertyExtract   int not null comment '0:不抽取；1：抽取',
   urlsAllowCrawlRegex  varchar(500),
   urlsNotAllowCrawlRegex varchar(500),
   siteId               int not null,
   contentType          int not null comment '1、html;2、json;3、jsonp',
   modelRegularExpression varchar(500) not null,
   pageTurningable      int not null,
   createTime           bigint,
   urlExtractRule       varchar(200) not null comment 'url抽取规则表达式',
   urlExtractRuleType   int not null comment '1、xpath；2、regular；3、css；4、jsonPath',
   creatorId            int not null,
   updateTime           bigint,
   updatePersonId       int not null,
   primary key (modelId, version)
);

/*==============================================================*/
/* Table: Cfg_PageModelProperty                                 */
/*==============================================================*/
create table Cfg_PageModelProperty
(
   propertyId           int not null,
   version              int not null,
   propertyName         varchar(50) not null,
   urlExtractable       int not null comment '0:不是url抽取;1:是url抽取',
   sortedId             int comment '界面前后排序使用',
   parentId             int not null comment '父模型属性Id，默认为0',
   modelId              int not null,
   groupType            int not null comment '0:为属性;1:为属性组',
   parseType            int not null comment '1、xpath；2、regular；3、css；4、jsonPath',
   matchExpression      varchar(500) not null,
   createTime           bigint,
   creatorId            int not null,
   updateTime           bigint,
   updatePersonId       int not null,
   primary key (propertyId, version)
);

/*==============================================================*/
/* Table: Cfg_Site                                              */
/*==============================================================*/
create table Cfg_Site
(
   siteId               int not null,
   version              int not null,
   siteName             varchar(50) not null,
   siteDomainName       varchar(200) not null,
   createTime           bigint,
   creatorId            int not null,
   updateTime           bigint,
   updatePersonId       int not null,
   primary key (siteId, version)
);

/*==============================================================*/
/* Table: Cfg_Site_Account                                      */
/*==============================================================*/
create table Cfg_Site_Account
(
   account_Id           varchar(100) not null comment '账号id(为网站的登录用户名)',
   site_Id              int not null comment '站点id',
   account_Pwd          varchar(100) not null comment '账号密码',
   site_Domain          varchar(100) not null comment '站点域名',
   account_Status       int not null default 1 comment '0:登录异常  1:正常  -1:不可用',
   primary key (account_Id, site_Id)
);

/*==============================================================*/
/* Table: Cfg_Site_Cookies                                      */
/*==============================================================*/
create table Cfg_Site_Cookies
(
   account_Id           varchar(100) not null comment '账号id',
   site_Id              int not null comment '站点id',
   site_Domain          varchar(100) not null comment '站点域名',
   cookie               varchar(5000) not null comment 'cookie',
   cookie_EffectiveTime int not null default 3600 comment 'cookie有效期(s)',
   cookie_CreateTime    bigint not null comment 'cookie生成时间',
   primary key (account_Id, site_Id)
);

/*==============================================================*/
/* Table: Cfg_Site_Login                                        */
/*==============================================================*/
create table Cfg_Site_Login
(
   site_Id              int not null comment '站点id',
   site_Domain          varchar(100) not null comment '站点域名',
   login_Addr           varchar(100) not null comment '登录地址',
   accountLogin_LocationRule varchar(100) comment '账户登录框定位规则(xpath)',
   unameInput_LocationRule varchar(100) not null comment '用户名输入框规则(xpath)',
   upwdInput_LocationRule varchar(100) not null comment '密码输入框规则(xpath)',
   loginInput_LocationRule varchar(100) not null comment '登录框规则',
   loginSuccess_RedictUrl varchar(100) not null comment '登录成功跳转地址',
   loginable            int not null default 1 comment '是否可以登录(0：否；1：是)',
   primary key (site_Id)
);

/*==============================================================*/
/* Table: Cfg_Task                                              */
/*==============================================================*/
create table Cfg_Task
(
   taskId               int not null default 0,
   version              int not null default 0,
   strategyName         varchar(200) character set utf-8 not null,
   parentUuid           varchar(50) comment '当前任务的父任务',
   uuid                 varchar(50) comment '任务派生出新任务的唯一标识（创建时候自动生成）',
   depth                int default 0 comment '任务深度级别（创建时候默认为0）',
   taskPeriodType       int not null default 1 comment '1：一次性任务;2、周期性任务',
   charSet              varchar(50) not null default 'utf-8' comment '网页编码方式',
   requestType          int not null default 1 comment '请求类型(1、get；2、post)',
   deduplicate          int not null default 1 comment '0:不去重;1:去重',
   siteId               int not null default 0,
   maxDeduplicateTime   int not null default 1296000 comment '秒级',
   connectionTimeout    int not null default 60 comment '秒级',
   maxRetryCount        int not null default 3,
   proxyId              int not null default 0 comment '0:无代理',
   priority             int default 2 comment '1、高；2、中；3、低',
   userAgent            varchar(500),
   startTime            bigint,
   endTime              bigint,
   crawlTimeInterval    int,
   startUrl             varchar(500) not null,
   moreStartUrl         varchar(2000) comment '只限采集运维页面使用',
   creatorId            int not null,
   createTime           bigint,
   updateTime           bigint,
   updatePersonId       int not null,
   primary key (taskId, version)
);

/*==============================================================*/
/* Table: Cfg_Task_Browser                                      */
/*==============================================================*/
create table Cfg_Task_Browser
(
   modelId              int not null,
   version              int not null,
   refreshable          int not null comment '是否需要下拉刷新(0:不刷新;1:刷新)',
   refreshType          int comment '刷新方式(1：下拉刷新；2：点击刷新；3：下拉加点击刷新)',
   eleLocateRule        varchar(200) comment '元素定位规则(xpath格式)',
   maxDropDownNum       int comment '最大下拉次数',
   refreshWaitTime      int comment '刷新等待时间',
   creatorId            int not null,
   createTime           bigint,
   updateTime           bigint,
   updatePersonId       int not null,
   primary key (modelId, version)
);

/*==============================================================*/
/* Table: Cfg_pageTurning                                       */
/*==============================================================*/
create table Cfg_pageTurning
(
   modelId              int not null,
   version              int not null,
   pageTurningType      int not null,
   extractType          int not null,
   extractRule          varchar(500) not null,
   pageDownExpression   varchar(500),
   creatorId            int not null,
   createTime           bigint,
   updateTime           bigint,
   updatePersonId       int not null,
   primary key (modelId, version)
);

