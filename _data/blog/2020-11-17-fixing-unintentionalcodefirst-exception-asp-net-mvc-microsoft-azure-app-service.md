---
template: BlogPost
path: /unintentionalCodeFirstException-on-azure-appservice/
date: 2020-11-17T13:45:45.030Z
title: >-
  Fixing UnintentionalCodeFirst Exception, ASP.NET MVC, Microsoft Azure App
  Service
metaDescription: >-
  Bug: After deployment to Azure AppService, MVC Applications that are built
  using Database First throw an Exception:
  System.Data.Entity.Infrastructure.UnintentionalCodeFirstException.
thumbnail: /assets/azure.jpg
---
Bug: After deployment to Azure AppService, ASP.NET MVC App built using Database First throws an Exception: System.Data.Entity.Infrastructure.UnintentionalCodeFirstException.

```
System.Data.Entity.Infrastructure.UnintentionalCodeFirstException: 
The context is being used in Code First mode with code that was generated from an EDMX file for either Database First or Model First development. 

This will not work correctly. To fix this problem do not remove the line of code that throws this exception. 

If you wish to use Database First or Model First, then make sure that the Entity Framework connection string is included in the app.config or web.config of the start-up project.
If you are creating your own DbConnection, then make sure that it is an EntityConnection and not some other type of DbConnection, and that you pass it to one of the base DbContext constructors that take a DbConnection. 

To learn more about Code First, Database First, and Model First see the Entity Framework documentation here: [http://go.microsoft.com/fwlink/?LinkId=394715](http://go.microsoft.com/fwlink/?LinkId=394715)
at LearnFloUtilities.Data.HuddleAfricaDBEntities.OnModelCreating(DbModelBuilder modelBuilder)
```



Fix:\
Remove the `ConenctionString` that uses the same name in Configuration, Azure Portal, that overrides the ConnectionString in your configuration on `Web.Config`. 

![](/assets/Azure.png "Azure Portal Configuration, Connection Strings")



After deleting the connection string that uses the same name, the error should be gone now.
