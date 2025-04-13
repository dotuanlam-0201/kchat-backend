import { Test, TestingModule } from '@nestjs/testing';
import { ChatGatewayGateway } from './chat-gateway.gateway';
import { ChatGatewayService } from './chat-gateway.service';

describe('ChatGatewayGateway', () => {
  let gateway: ChatGatewayGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChatGatewayGateway, ChatGatewayService],
    }).compile();

    gateway = module.get<ChatGatewayGateway>(ChatGatewayGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
