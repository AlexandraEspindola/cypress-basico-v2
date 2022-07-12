/// <reference types="Cypress" />



describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function(){
        cy.visit('./src/index.html')
    })

    it('verifica o título da aplicação', function() {
        
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  
    })


    it('preenche os campos obrigatórios e envia o formulário', function(){
        const longTest = "Mussum Ipsum, cacilds vidis litro abertis. Si num tem leite então bota uma pinga aí cumpadi!Quem num gosta di mé, boa gentis num é.Pra lá , depois divoltis porris, paradis.A ordem dos tratores não altera o pão duris." 
        cy.get('#firstName').type('Ale')
        cy.get('#lastName').type('Silva')
        cy.get('#email').type('ale@mail.com')
        cy.get('#phone').type('0')
        cy.get('#open-text-area').type(longTest, {delay:0})
        cy.get('button[type="submit"]').click()
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function(){
        const longTest = "Mussum Ipsum, cacilds vidis litro abertis. Si num tem leite então bota uma pinga aí cumpadi!Quem num gosta di mé, boa gentis num é.Pra lá , depois divoltis porris, paradis.A ordem dos tratores não altera o pão duris." 
        cy.get('#firstName').type('Ale')
        cy.get('#lastName').type('Silva')
        cy.get('#email').type('alemail.com')
        cy.get('#phone').type('0')
        cy.get('#open-text-area').type(longTest, {delay:0})
        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')
        //cy.contains('.error', 'Valide os campos obrigatórios!').should('be.visible')
    })


    it('campo de telefone continua vazio quando preenchido com valor não-numérico', function(){

        cy.get('#phone')
            .type('lalala')
            .should('have.value', '')

    })


    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){
        const longTest = "Mussum Ipsum, cacilds vidis litro abertis. Si num tem leite então bota uma pinga aí cumpadi!Quem num gosta di mé, boa gentis num é.Pra lá , depois divoltis porris, paradis.A ordem dos tratores não altera o pão duris." 
        cy.get('#firstName').type('Ale')
        cy.get('#lastName').type('Silva')
        cy.get('#email').type('alemail.com')
        cy.get('#phone-checkbox').click()
        cy.get('#open-text-area').type(longTest, {delay:0})
        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')
        // cy.contains('.error', 'Valide os campos obrigatórios!').should('be.visible')

        cy.get('#phone-checkbox')
    })



    it('preenche e limpa os campos nome, sobrenome, email e telefone', function(){
       
        cy.get('#firstName')
            .type('Ale')
            .should('have.value', "Ale")
            .clear()
            .should('have.value', '')

        cy.get('#lastName')
            .type('Silva')
            .should('have.value', "Silva")
            .clear()
            .should('have.value', '')

        cy.get('#email')
            .type('ale@mail.com')
            .should('have.value', "ale@mail.com")
            .clear()
            .should('have.value', '')


        cy.get('#phone-checkbox').click()

        // cy.get('#open-text-area').type(longTest, {delay:0})
        // cy.get('button[type="submit"]').click()
        // cy.get('.error').should('be.visible')
        // cy.contains('.error', 'Valide os campos obrigatórios!').should('be.visible')

    })


    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function(){
        
        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')

        
    })



    
    it('envia o formuário com sucesso usando um comando customizado', function(){
        
        cy.fillMandatoryFieldsAndSubmit()
        cy.get('.success').should('be.visible')

    })



    it('seleciona um produto (YouTube) por seu texto', function(){

        cy.get('#product')
            .select('YouTube')
            .should('have.value', 'youtube')
        
 
    })

    it('seleciona um produto (Mentoria) por seu valor (value)', function(){

        cy.get('#product')
            .select('Mentoria')
            .should('have.value', 'mentoria')
        
 
    })


    it('seleciona um produto (Blog) por seu índice', function(){

        cy.get('#product')
            .select(1)
            .should('have.value', 'blog')
        
 
    })

    
    it('seleciona um produto (Blog) por seu índice', function(){

      cy.get('input[type="radio"][value="feedback"]')
        .check()
        .should('have.value', 'feedback')
      //cy.get(':nth-child(4) > input').check() -> mesma coisa linha de cima
    })
    

    it('seleciona um produto (Blog) por seu índice', function(){

        cy.get('input[type="checkbox"]')
            .check()
            .should('be.checked')
            .last()
            .uncheck()
            .should('not.be.checked')     
      })


      it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){
        const longTest = "Mussum Ipsum, cacilds vidis litro abertis. Si num tem leite então bota uma pinga aí cumpadi!Quem num gosta di mé, boa gentis num é.Pra lá , depois divoltis porris, paradis.A ordem dos tratores não altera o pão duris." 
        cy.get('#firstName').type('Ale')
        cy.get('#lastName').type('Silva')
        cy.get('#email').type('alemail.com')
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type(longTest, {delay:0})
        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')
        // cy.contains('.error', 'Valide os campos obrigatórios!').should('be.visible')

        
    })


    it('seleciona um arquivo simulando um drag-and-drop', function(){
        
        // cy.get('#file-upload')
        cy.get('input[type="file"]#file-upload')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/example.json')
            .should(function($input){
                expect($input[0].files[0].name).to.equal('example.json')
                console.log($input)

            })

    })

    it('seleciona um arquivo simulando um drag-and-drop', function(){
        
        // cy.get('#file-upload')
        cy.get('input[type="file"]#file-upload')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/example.json', {action: 'drag-drop'}) 
            .should(function($input){
                expect($input[0].files[0].name).to.equal('example.json')
                console.log($input)

            })

    })

    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function(){
        
        cy.fixture('example.json').as('sampleFile')
        cy.get('input[type="file"]#file-upload')
            .selectFile('@sampleFile') 
            .should(function($input){
                expect($input[0].files[0].name).to.equal('example.json')
                console.log($input)

            })

    })
      


    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function(){
        
        cy.get('#privacy a').should('have.attr', 'target', '_blank')

        })

    it('acessa a página da política de privacidade removendo o target e então clicanco no link', function(){
        
        cy.get('#privacy a')
            .invoke('removeAttr', 'target')
            .click()
    
        })

    it('testa a página da política de privavidade de forma independente', function(){
        
        cy.get('#privacy a')
            .invoke('removeAttr', 'target')
            .click()

        cy.contains('Talking About Testing').should('be.visible')
    
        })

    

})
