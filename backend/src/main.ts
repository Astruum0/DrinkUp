import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CocktailSchema } from './Schemas/cocktail.schema';
import AdminBro from 'admin-bro';
import AdminBroMongoose from '@admin-bro/mongoose';
import AdminBroExpress from '@admin-bro/express';
AdminBro.registerAdapter(AdminBroMongoose);

const AdminBroOptions = {
  resources: [CocktailSchema],
};

const adminBro = new AdminBro(AdminBroOptions);
const router = AdminBroExpress.buildRouter(adminBro);

app.use(adminBro.options.rootPath, router);
app.listen(8000, function () {
  console.log('Listening to Port 8000');
});
AdminBro.registerAdapter(AdminBroMongoose);
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(3001);
}
bootstrap();
